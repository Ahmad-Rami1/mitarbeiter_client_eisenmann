import React from "react";

const StdKontoTable = (props) => {
  return (
    <div className="container mt-2 p-2 stdKontoTableContainer">
        <h5 className="noScroll">Sie haben bereits einen Vorgang zum Stdkonto für diesen Monat eingereicht: </h5>
      <table className="table">
        <tbody>
          <tr>
            <th scope="col">Stundenkonto Vormonat: </th>
            <td>{props.stdkontoData.standvormonat} Std.</td>
          </tr>
          <tr>
            <th scope="col">getätigter Vorgang: </th>
            <td>{props.stdkontoData.uebertragArt}</td>
          </tr>
          <tr>
            <th scope="col">Anzahl Stunden: </th>
            <td>{props.stdkontoData.uebertragStd} Std.</td>
          </tr>
          <tr>
            <th scope="col">Stundenkonto Aktuell: </th>
            <td>{props.stdkontoData.standaktuell} Std.</td>
          </tr>
          <tr>
            <th scope="col">Getätigt am: </th>
            <td>
              {props.stdkontoData.timestamp &&
                props.stdkontoData.timestamp.split(" ")[1] +
                  " " +
                  props.stdkontoData.timestamp
                    .split(" ")[0]
                    .split("-")
                    .reverse()
                    .join(".")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StdKontoTable;
