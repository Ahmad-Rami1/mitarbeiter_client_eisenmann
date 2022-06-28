import React, { useState, useContext } from "react";
import publicRequest from "../requestMethods";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
import "moment/locale/de";
moment.locale("de");

const StdKontoForm = (props) => {
  const { user } = useContext(AuthContext);
  const config = {
    headers: { Authorization: `Bearer ${user.jwt}` },
  };

  const [ubertragType, setUbertragType] = useState("auszahlen");
  const [ubertragFormData, setUbertragFormData] = useState({
    mitarbeiter_id: user.id,
    year: props.arbeitszeit.year,
    month: props.arbeitszeit.month,
    standvormonat: props.stdkonto.stdkontoAktuell,
    // standaktuell: props.stdkonto.stdkontoAktuell,
    uebertragStd: 0,
    uebertragArt: ubertragType,
  });
  const [refresher, setRefresher] = useState(true);

  const fromChangeHandler =(e) => {
    setUbertragFormData({...ubertragFormData,   year: props.arbeitszeit.year,month: props.arbeitszeit.month ,standvormonat: props.stdkonto.stdkontoAktuell  ,uebertragStd: e.target.value, uebertragArt:ubertragType })
  }

  const ubertragTypeChangeHandler = (e) => {
    setUbertragType(e.target.value)
    setUbertragFormData({...ubertragFormData, uebertragArt: e.target.value})
  }

  const submitHandler = (e) => {
    e.preventDefault();
    publicRequest.post("stdkonto/create_stdkonto.php", JSON.stringify(ubertragFormData), config).then((res) => {
        if (res.status === 200) {
          alert("Übertrag wurde erfolgreich eingereicht")
          
  }}).then(() => setRefresher(!refresher)).then(() => props.refreshHandler(refresher))
  }



  return (
    <div className="container p-0 maxWidth500">
      <h5 className="text-white noScroll p-2 m-2">Sie können einen Stundenkontoübertrag für den Monat {moment(props.arbeitszeit.month).format("MMMM") + " " + props.arbeitszeit.year} tätigen:</h5>
    <div
      className="container p-0 mt-2 d-flex justify-content-between flex-column stdkontoform"
 
    >
      <div className="row w-100 m-0 p-0 d-flex align-items-center justify-content-between">
        <div className="col-6 p-0 pt-1 d-flex flex-column justify-content-around align-items-center arbeitszeitLeftContainer" >
          <p className="noScroll m-0 p-0">
          <span className="bld">Arbeitszeit im {moment(props.arbeitszeit.month).format("MMMM") + " " + props.arbeitszeit.year}: </span> 
          </p>
          <p className="noScroll ">{props.arbeitszeit.abreitszeitMonat} Std.</p>{" "}
        </div>
        <div className="col-6 p-0 pt-1  d-flex flex-column justify-content-around align-items-center  stundenkontoRightContainer">
          <p className="noScroll m-0 p-0"> <span className="bld">Stdkonto: </span> {props.stdkonto.stdkontoAktuell} Std. </p>
          <p className="noScroll  lastStandStdkontoItalic">
           Stand {props.stdkonto.stand &&
              props.stdkonto.stand.split(" ")[0].split("-").reverse().join(".") + "."}
          </p>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="row w-100 mb-4 d-flex align-items-center">
          <div className="d-flex align-items-center col-8">
            <input
              type="number"
              className="form-control m-2 inputStdUbertrag"
            //   style={{width:"25px!important"}}
              aria-label="Text input with dropdown button"
              placeholder="Std."
              required
              max={
                ubertragType === "aufbauen"
                  ? props.arbeitszeit.abreitszeitMonat
                  : props.stdkonto.stdkontoAktuell
              }
              min="1"
              onChange={fromChangeHandler}
            />
            <div className="input-group-prepend">
              <select
                type="text"
                className="form-control p-0 dropdownUbertrag"
               
                aria-label="Text input with dropdown button "
                onChange={ubertragTypeChangeHandler}
              >
                <option value="auszahlen">auszahlen</option>
                <option value="aufbauen">aufbauen</option>
              </select>
            </div>
          </div>
          <div className="col-4">
            <button className="btn mr-2 btn-grad" type="submit">Eintragen</button>
          </div>
        </div>
      </form>
    </div>

    </div>
  );
};

export default StdKontoForm;
