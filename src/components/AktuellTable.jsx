import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import publicRequest from "../requestMethods";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/de";
moment.locale("de");

const NoSchicht = () => (
  <div className="container d-flex justify-content-center align-items-stretch h-100">
    <h1 className="text-center noScroll text-white p-4">Aktuell keine Schichten</h1>
  </div>
);

const Schicht = ({ schicht }) => {
  const navigate = useNavigate();

  const StatusField = () => {
    const dateNow = moment().unix();
    const schichtStart = moment(schicht.datum + " " + schicht.vondat).unix();

    if (dateNow < schichtStart) {
      return <span className="noScroll">geplant</span>;
    } else {
      return (
        <button
          onClick={() => navigate("/schichtEintragen", { state: schicht })}
          className="eintragBtn"
        >
          Zum Eintragen
        </button>
      );
    }
  };

  return (
    <div className="container mt-2 euroblue" style={{ overflowY: "show", borderRadius: 10 }}>
      <div
        className="row d-flex kopfPlan py-2 align-items-center justify-content-between"
        style={{ minHeight: "30px", backgroundColor: "#aeb2e0",  }}
      >
        <div
          className="col-lg-6 col-12 p-2noScroll d-flex align-items-center noScroll h-100 "
         
        >
          {moment(schicht.datum).format("dddd")}{" "}
          {schicht.datum.split("-").reverse().join(".")}
        </div>
        <div
          className="col-lg-6 col-12 p-2noScroll d-flex align-items-center noScroll h-100 "
    
        >
          {schicht.vondat} - {schicht.bisdat}
        </div>
      </div>
      <div
        className="row bg-light d-flex  align-items-stretch "
        style={{ minHeight: "30px" }}
      >
        <div
          className="col-lg-3 col-12 p-2 noScroll d-flex justify-content-between align-items-stretch  h-100 border-top border-secondary"
          style={{ minHeight: "30px", fontSize: "20px" }}
        >
          <span className="bld noScroll"> Auftragnr:</span>{" "}
          <span className=" noScroll">{schicht.auftragnr}</span>
        </div>
        <div
          className="col-lg-3 col-12 p-2 noScroll d-flex justify-content-between align-items-stretch h-100 border-top border-secondary"
          style={{ minHeight: "30px" }}
        >
          <span className="bld noScroll"> Projektnr:</span>{" "}
          <span className=" noScroll">{schicht.projektnr}</span>
        </div>
        <div
          className="col-lg-2 col-12 p-2 noScroll d-flex justify-content-between align-items-stretch h-100 border-top border-secondary"
          style={{ minHeight: "30px" }}
        >
          <span className="bld noScroll"> Qual.:</span>{" "}
          <span className=" noScroll">{schicht.qualif}</span>
        </div>
        <div
          className="col-lg-4 col-12 p-2 noScroll d-flex justify-content-between align-items-stretch h-100 border-top border-secondary"
          style={{ minHeight: "30px" }}
        >
          <span className="bld noScroll"> Funktion:</span>{" "}
          <span className=" noScroll">{schicht.name1}</span>
        </div>
      </div>

      <div
        className="row bg-light d-flex align-items-stretch "
        style={{ minHeight: "30px" }}
      >
        <div
          className="col-lg-7 col-12 p-2 noScroll d-flex justify-content-between align-items-stretch  h-100 border-top border-secondary"
          style={{ minHeight: "30px" }}
        >
          <span className="bld noScroll">Bauvor.:</span>{" "}
          <span className=" noScroll">{schicht.bauvor}</span>
        </div>

        <div
          className="col-lg-5 col-12 p-2 noScroll d-flex justify-content-between align-items-stretch h-100 border-top border-secondary"
          style={{ minHeight: "30px" }}
        >
          <span className="bld noScroll"> Treffpunkt:</span>{" "}
          <span className=" noScroll">{schicht.treffp}</span>
        </div>
      </div>
      <div
        className="row bg-light d-flex align-items-stretch "
        style={{ minHeight: "30px" }}
      >
        <div
          className="col-lg-6 col-12  p-2 noScroll d-flex justify-content-between align-items-stretch h-100 border-top border-secondary"
          style={{ minHeight: "30px"}}
        >
          <span className="bld noScroll "> Bemerkung:</span>{" "}
          <span className=" noScroll">{schicht.bemerk}</span>
        </div>
        <div
          className="col-lg-6 col-12 p-2 noScroll d-flex justify-content-end align-items-stretch h-100 border-top border-secondary"
          style={{ minHeight: "30px" }}
        >
          <StatusField />
        </div>
      </div>
    </div>
  );
};

const AktuellTable = (props) => {
  const { user } = useContext(AuthContext);
  const config = {
    headers: { Authorization: `Bearer ${user.jwt}` },
  };

  const [aktuelleSchichte, setAktuelleSchichten] = useState([]);
  const [eingetrageneSchichte, setEingetrageneSchichte] = useState([]);

  useEffect(() => {
    const getAktSchichten = async () => {
      const res = await publicRequest.get(
        "/gdi/aktuelleSchichten.php?mitarbeiterId=" + user.id,
        config
      );
      await setAktuelleSchichten(res.data.data);
      await console.log(res.data.data);
    };
    getAktSchichten();
  }, []);

  useEffect(() => {
    const getEingtSchichten = async () => {
      const res = await publicRequest.get(
        "/schicht/getPosNr.php?mitarbeiterId=" + user.id,
        config
      );
      if (res.data.data) {
        await setEingetrageneSchichte(res.data.data);
        await console.log(res.data.data);
      }
    };
    getEingtSchichten();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ height: "80vh", overflowY: "scroll" }}
    >
      {aktuelleSchichte && aktuelleSchichte.length > 0 ? (
        aktuelleSchichte
          .filter((s) => !eingetrageneSchichte.includes(s.posnr.toString()))
          .map((s) => <Schicht schicht={s} />)
      ) : (
        <NoSchicht />
      )}
    </div>
  );
};

export default AktuellTable;
