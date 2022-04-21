import React, {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";
const MonthBar = (props) => {
const {user} = useContext(AuthContext);
  const year =(moment().year()).toString();
  const lastYear =(moment().year() - 1).toString();

  return (
    <div className="container-fluid px-0 frmSearch">
      <div className="container">
        {/* <form action="uebersichtSchichten.php" method="POST" className="p-1 mb-0 "> */}
          <div className="row mt-2 ">
            <div className="col-12 col-sm-12 col-md-6 col-lg-2 d-flex align-items-center">
              <div className="d-flex justify-content-center mt-1  bld noScroll">
                {user && user.vorname + " " + user.nachname}
              </div>
            </div>

            <div className="col-12 col-sm-12 col-md-6 col-lg-6   d-flex justify-content-between align-items-center mt-2 my-2 bld smallScreenText">
              Monat:
              <div className="control-group d-flex align-items-center mt-1">
                <select
                  id="auto_position"
                  className="auto_position inputt mx-2 mb-1 smallScreenText"
                  name="month"
                  placeholder="Quali."
                  value={props.month}
                  onChange={(e) => props.handleChangeMonth(e.target.value)}
                >
                  <option value="01">Januar</option>
                  <option value="02">Februar</option>
                  <option value="03">März</option>
                  <option value="04">April</option>
                  <option value="05">Mai</option>
                  <option value="06">Juni</option>
                  <option value="07">Juli</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Dezember</option>
                </select>
              </div>
              <div className="control-group d-flex align-items-center mt-1">
                <select className=" inputt mx-2 mb-1 smallScreenText" name="year"  onChange={(e) => props.handleChangeYear(e.target.value)}>
                  <option value={year.toString()}>{year.toString()}</option>
                  <option value={lastYear.toString()}>{lastYear.toString()}</option>
                </select>
              </div>
            </div>
          </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default MonthBar;
