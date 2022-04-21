import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import publicRequest from "../requestMethods";
import { replaceUmlaute } from "../assets/replaceUmlaut";
import Compressor from "compressorjs";
import {MdOutlineArrowBack }from 'react-icons/md'
import { useNavigate } from "react-router-dom";


const SchichtEintragen = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const inputEl = useRef(null);
  const config = {
    headers: { Authorization: `Bearer ${user.jwt}` },
  };

  const [vma28, setvma28] = useState(false);
  const [ausfallSchicht, setAusfallSchicht] = useState(false);
  const [materialTransport, setMaterialTransport] = useState("0");
  const [image, setImage] = useState({
    name: "",
    file: "",
  });
  const [schichtData, setSchichtData] = useState({
    projektnr: props.state.projektnr,
    auftragnr: props.state.auftragnr,
    datumAbfahrt: props.state.datum,
    dienstbeginn: props.state.vondat,
    dienstende: props.state.bisdat,
    Pause: "30",
    bauKm: "",
    pkwKm: "",
    abfahrtTime: "",
    ankunftTime: "",
    qual: props.state.qualnr,
    qualGDI: props.state.qualif,
    bereitStd: "0",
    bereitMin: "0",
    stdzettel: "",
    einsatzort: props.state.bauvor,
  });

  const changeHandler = (e) => {
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newSchichtData = { ...schichtData };
    newSchichtData[fieldName] = fieldValue;
    setSchichtData(newSchichtData);
  };

  const materialTransportHandler = (e) => {
    setMaterialTransport(e.target.value);
  };

  const handleChangeImage = (e) => {
    const bild = e.target.files[0];
    new Compressor(bild, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        setImage({
          name: URL.createObjectURL(e.target.files[0]),
          file: compressedResult,
        });
      },
      error: (err) => {
        setImage({
          name: "",
          file: "",
        });
      },
    });
  };

  const handleVmaChange = () => {
    setvma28(!vma28);
  };
  const handleAusfallChange = () => {
    setAusfallSchicht(!ausfallSchicht);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      projektnr: schichtData.projektnr,
      auftragnr: schichtData.auftragnr,
      datumAbfahrt: schichtData.datumAbfahrt,
      dienstbeginn: schichtData.dienstbeginn,
      dienstende: schichtData.dienstende,
      Pause: schichtData.Pause,
      bauKm: schichtData.bauKm === "" ? "0" : schichtData.bauKm,
      pkwKm: schichtData.pkwKm === "" ? "0" : schichtData.pkwKm,
      materialtransport: materialTransport,
      abfahrtTime: schichtData.abfahrtTime,
      ankunftTime: schichtData.ankunftTime,
      qual: schichtData.qual,
      qualGDI: schichtData.qualGDI,
      bereitStd: schichtData.bereitStd === "" ? "0" : schichtData.bereitStd,
      bereitMin: schichtData.bereitMin === "" ? "0" : schichtData.bereitMin,
      stdzettel: schichtData.stdzettel,
      einsatzort: replaceUmlaute(schichtData.einsatzort),
      bundesland: user.bundesland,
      niederlassung: user.niederlassung,
      mitarbeiterId: user.id,
      vornameName: user.vorname + " " + user.nachname,
      vmaJson: vma28,
      ausfallJson: ausfallSchicht,
      posnr: props.state.posnr
    };

    try {
      publicRequest
        .post("schicht/insert_schicht.php", JSON.stringify(data), config)
        .then((res) => {
          if (res.status === 200) {
            alert("Schicht wurde erfolgreich eingetragen");
            //  window.location.reload();
            setSchichtData({
              projektnr: "",
              auftragnr: "",
              datumAbfahrt: "",
              dienstbeginn: "",
              dienstende: "",
              Pause: "30",
              bauKm: "",
              pkwKm: "",
              abfahrtTime: "",
              ankunftTime: "",
              qual: "",
              bereitStd: "0",
              bereitMin: "0",
              stdzettel: "",
              einsatzort: "",
            });
            setvma28(false);
            setMaterialTransport("0");
            if (image.file !== "") {
              const imageFormData = new FormData();
              imageFormData.append("image", image.file);
              imageFormData.append(
                "name",
                schichtData.stdzettel + "_" + user.id
              );

              publicRequest
                .post("server/server.php", imageFormData, config)
                .then((res) => (inputEl.current.value = ""))
                .then(() => setImage({ file: "", name: "" }));
            }
          }
        }).then(() => navigate("/",  {state: null}))
        .catch((err) => {
          if (err.response) {
            alert(
              "Schicht nicht eingetragen! Bitte prüfen Sie die zeitliche Reihenfolge der Uhrzeiten."
            );
          }
        });
    } catch (err) {
      alert("schicht nicht eingetragen!");
      console.log(err);
    }
  };


  return (
    <div className="d-flex justify-content-center">
      <div
        className="card border border-secondary pr-3 pl-3 pt-3 mb-1 mt-3 crdd"
        style={{ width: "45rem" }}
        >
        <button onClick={() => navigate("/",  {state: null})} className="backBtn"><MdOutlineArrowBack /> zurück zu Übersicht</button>
        <div className="card-body pt-1 pb-1" id="nopaddingcard">
          
          <form
            onSubmit={(e) => submitHandler(e)}
            className="frm1"
            encType="multipart/form-data"
          >
            <div className="row g-2 my-2 d-flex align-items-center">
              
              <div className="col-6 col-sm-3 col-md-3 bold bluu vertical d-flex align-items-center  mb-2">
                Projektnr.:
              </div>
              <div className="col-6 col-sm-3 col-md-3 textRight mb-2 noScroll colorBlue">
                {schichtData.projektnr}
              </div>
              <div className="col-6 col-sm-3 col-md-3 bold bluu vertical d-flex align-items-center colorBlue  mb-2">
                Auftragsnr.:
              </div>
              <div className="col-6 col-sm-3 col-md-3 textRight  mb-2 colorBlue noScroll">
                {schichtData.auftragnr}
              </div>
            </div>
            <div className="row g-2  my-2 border-top1  ">
              <div className="col-6 col-sm-3 col-md-2 mb-2 bold bluu vertical d-flex align-items-center noScroll">
                Tätigkeit:
              </div>
              <div className="col-6 col-sm-9 col-md-2 textRight">
                <div className="control-group noScroll colorBlue">
                  {props.state.qualif}
                </div>
              </div>
              <div className="col-6 col-sm-3 col-md-2 mb-2 bold bluu vertical d-flex align-items-center">
                Einsatzort:
              </div>
              <div className="col-6 col-sm-9 col-md-5 textRight noScroll colorBlue">
                {props.state.bauvor}
              </div>
            </div>

            <div className="row g-2 border-top1 marginTop ">
              <div className="col-7 col-sm-3 col-md-3 bold bluu vertical  d-flex align-items-center mt-2">
                Abfahrtdatum:
              </div>
              <div className="col-5 col-sm-3 col-md-3 textRight justifyEnd d-flex align-items-center mt-2">
                <input
                  type="date"
                  name="datumAbfahrt"
                  value={schichtData.datumAbfahrt}
                  onChange={(e) => changeHandler(e)}
                  className="dateinput"
                  required
                />
              </div>

              <div className="col-6 col-sm-3 col-md-3 bold bluu vertical d-flex align-items-center mt-2">
                Abfahrt Wohnort:
              </div>
              <div className="col-6 col-md-3 col-sm-3 d-flex align-items-center justifyEnd mt-2 textRight">
                <input
                  type="time"
                  name="abfahrtTime"
                  value={schichtData.abfahrtTime}
                  onChange={(e) => changeHandler(e)}
                  className="timeinput"
                  required
                />
              </div>
            </div>

            <div className="row g-2 border-top1 mt-3">
              <div className="col-7 col-sm-3 col-md-3 bold bluu vertical d-flex align-items-center">
                Dienstbeginn:
              </div>
              <div className="col-5 col-sm-3 col-md-3 textRight">
                <input
                  type="time"
                  name="dienstbeginn"
                  value={schichtData.dienstbeginn}
                  onChange={(e) => changeHandler(e)}
                  required
                  className="timeinput"
                />
              </div>
              <div className="col-7 col-sm-3 col-md-3 bold bluu vertical  d-flex align-items-center marginTop">
                Dienstende:
              </div>
              <div className="col-5 col-sm-3 col-md-3 textRight marginTop">
                <input
                  type="time"
                  name="dienstende"
                  value={schichtData.dienstende}
                  onChange={(e) => changeHandler(e)}
                  required
                  className="timeinput"
                />
              </div>
            </div>

            <div className="row g-2 border-top1 mt-3">
              <div className="col-7 col-sm-3 col-md-3 bold bluu vertical  d-flex align-items-center">
                Ankunft Wohnort:
              </div>
              <div className="col-5 col-sm-3 col-md-3 textRight">
                <input
                  type="time"
                  name="ankunftTime"
                  value={schichtData.ankunftTime}
                  onChange={(e) => changeHandler(e)}
                  className="timeinput"
                  required
                />
              </div>
              <div className="col-6 col-sm-3 col-md-3 bold bluu mb-1 vertical d-flex align-items-center marginTop">
                Pause (min):
              </div>
              <div className="col-6 col-sm-3 col-md-2 textRight marginTop">
                <input
                  type="number"
                  size="3"
                  className="inpuPause mb-1"
                  name="Pause"
                  onChange={(e) => changeHandler(e)}
                  value={schichtData.Pause}
                  required
                />
              </div>
            </div>

            <div className="row g-2 border-top1 marto mt-2">
              <div className="col-5 col-sm-3 col-md-3  bold pr-0 bluu marto vertical d-flex align-items-center ">
                Bezahlte Bereitschaft:
              </div>
              <div className="col-7 col-sm-3 col-md-3 pl-0 textRight  justifyEnd d-flex ">
                <div className="backwhite textRight">
                  <input
                    type="number"
                    size="2"
                    max="12"
                    className="inpu text-right noOutline"
                    name="bereitStd"
                    required
                    onChange={(e) => changeHandler(e)}
                    value={schichtData.bereitStd}
                  />
                  <span className="euroblue" required>
                    Std.
                  </span>
                  <input
                    type="number"
                    size="2"
                    max="59"
                    required
                    className="inpu text-right noOutline"
                    name="bereitMin"
                    onChange={(e) => changeHandler(e)}
                    value={schichtData.bereitMin}
                  />
                  <span className="euroblue" required>
                    Min.
                  </span>
                </div>
              </div>

              <div className="col-8 col-sm-3 col-md-3 bold  bluu marto vertical  d-flex align-items-center ">
                Pkw. km.:
              </div>

              <div className="col-4 col-sm-3 col-md-3 inputtkm1 textRight d-flex align-items-center justifyEnd">
                <input
                  type="number"
                  className="inputtkm text-right"
                  size="3"
                  name="pkwKm"
                  value={schichtData.pkwKm}
                  onChange={(e) => changeHandler(e)}
                  placeholder="0 Km"
                  id="km"
                />
              </div>
            </div>

            <div className="row g-2 border-top1 my-3">
              <div className="col-6 col-sm-3 col-md-3  bold pr-0 bluu marto vertical d-flex align-items-center  ">
                Materialtransport:
              </div>
              <div className="col-6 col-sm-3 col-md-3 inputtkm1 textRight pl-0 d-flex align-items-center justifyEnd">
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label noScroll"
                    htmlFor="inlineRadio1"
                  >
                    Ja
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="materialtransport"
                    checked={materialTransport === "2.5"}
                    onChange={(e) => materialTransportHandler(e)}
                    id="inlineRadio1"
                    value="2.5"
                  />
                </div>
                <div className="form-check form-check-inline">
                  <label
                    className="form-check-label noScroll"
                    htmlFor="inlineRadio2"
                  >
                    Nein
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="materialtransport"
                    id="inlineRadio2"
                    checked={materialTransport === "0"}
                    onChange={(e) => materialTransportHandler(e)}
                    value="0"
                  />
                </div>
              </div>

              <div className="col-7 col-sm-3 col-md-3 bold  bluu marto vertical  d-flex align-items-center">
                Baustellenkm.:
              </div>

              <div className="col-5 col-sm-3 col-md-3 textRight">
                <input
                  type="number"
                  className="inputtkm text-right"
                  value={schichtData.bauKm}
                  name="bauKm"
                  onChange={(e) => changeHandler(e)}
                  placeholder="0 Km"
                  id="km"
                />
              </div>
            </div>
            <div className="row g-2 border-top1 my-3">
              <div className="col-6 col-sm-3 col-md-3  bold pr-0 bluu marto vertical d-flex align-items-center   ">
                Übernachtung?
              </div>
              <div className="col-2 col-sm-3 col-md-3 inputtkm1  pl-0 d-flex align-items-center justifyEnd noScroll mt-1">
                <div
                  className="double"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    zIndex: 99,
                    minWidth: 15,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={vma28}
                    onChange={handleVmaChange}
                    name="uebernachtung"
                    style={{ marginTop: -11, zIndex: 99 }}
                  />
                </div>
               
              </div>
              <div className="col-7 col-sm-3 col-md-3 bold  bluu marto vertical  d-flex align-items-center ">
                Stdzettelnr.:
              </div>
              <div className="col-5 col-sm-3  col-md-3 inputtkm1 textRight d-flex align-items-center justifyEnd">
                <input
                  className="inputtkm"
                  name="stdzettel"
                  maxLength="8"
                  value={schichtData.stdzettel}
                  onChange={(e) => changeHandler(e)}
                  placeholder="z.B. 123456"
                  type="number"
                  required
                />
              </div>
              </div>
              <div className="row g-2 border-top1 my-3">
                <div className="col-6 col-sm-3 col-md-3  bold pr-0 bluu marto vertical d-flex align-items-center  ">
                  Ausfallschicht?
                </div>
                <div className="col-2 col-sm-3 col-md-3 inputtkm1  pl-0 d-flex align-items-center justifyEnd noScroll mt-1">
                  <div
                    className="double"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      zIndex: 99,
                      minWidth: 15,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={ausfallSchicht}
                      onChange={handleAusfallChange}
                      name="ausfalla"
                      style={{ marginTop: -11, zIndex: 99 }}
                    />
                  </div>
                </div>
              </div>
              <div className="row g-2 border-top1 my-3">
                <div className="col-md-6 col-12  textRight d-flex align-items-center justify-content-end">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    ref={inputEl}
                    onChange={handleChangeImage}
                  />
                </div>
                <div className="col-md-2 col-12 mt-2 d-flex align-items-center justify-content-center">
                  {image.name !== "" && (
                    <img
                      style={{ maxHeight: 100 }}
                      src={image.name}
                      alt="File preview"
                    />
                  )}
                </div>
              </div>
          

            <div className="row g-2 border-top1 mb-2 d d-flex justify-content-center">
              <div className="col-12 col-sm-6 col-md-6  ">
                <button
                  type="submit"
                  name="submit"
                  className="btn btn-primary baton"
                >
                  Schicht eintragen
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchichtEintragen;
