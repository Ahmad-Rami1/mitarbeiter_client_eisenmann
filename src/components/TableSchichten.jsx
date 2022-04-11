import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import publicRequest from "../requestMethods";
import moment from "moment";
import { taetigkeiting } from "../assets/taetigkeiten";
const TableSchichten = (props) => {
  const {user} = useContext(AuthContext);

  const [schichten, setSchichten] = useState([]);

  let  az= 0;
  let  na=0;
  let  so=0;
  let  ft=0;
  let  vma=0;
  let  mt= 0;
  let  km=0;
  
  const config = {
    headers: { Authorization: `Bearer ${user.jwt}` },
  };

  useEffect(() => {
    const getData = async() => {
      const res = await publicRequest.get(`schicht/get_schichten.php?month=${props.month}&year=${props.year}&mitarbeiterId=${user.id}`, config )
      setSchichten(res.data.data);
     
      }
    getData();
  }, [props.month, props.year])

const EinzelSchicht = (props) => (

  <tr className={props.stripeRow}>
    <td className="noScroll">{props.einsatzort} </td>
    <td className="noScroll">{props.Projektnr} </td>
    <td className="noScroll">{props.auftragnr} </td>
    <td className="noScroll">{props.date.split("-").reverse().join(".")} </td>
    <td className="noScroll">{props.azbeginn} </td>
    <td className="noScroll">{props.azende} </td>
    <td className="noScroll">{props.pause} </td>
    <td className="noScroll">{props.arbeitszeit} </td>
    <td className="noScroll">{props.nachtzuschlag} </td>
    <td className="noScroll">{props.sonntagzuschlag} </td>
    <td className="noScroll">{props.feiertagzuschlag} </td>
    <td className="noScroll">{props.vma} </td>
    <td className="noScroll">{props.bereitschaft} </td>
    <td className="noScroll">{props.pkw_km} </td>
    <td className="noScroll">{props.baustellenkm} </td>
    <td className="noScroll">{props.materialtransport} </td>
    <td className="noScroll">{props.qualifikation} </td>
    <td className="noScroll">{props.stdzettel} </td>
    <td className="noScroll">{props.freigabe} </td>
    <td className="noScroll">{props.id} </td>
</tr>

)

  return (
    <>
      <div className="table-responsive">
        <table className="tbl w-100">
          <thead>
            <tr className="tbl">
              <th className=" " scope="col">
                Einsatzort
              </th>
              <th scope="col">Projektnr.</th>
              <th scope="col " className=" ">
                Auftragnr.
              </th>
              <th className="noScroll" scope="col">
                Datum
              </th>
              <th className="noScroll" scope="col">
                Dienstbeginn
              </th>
              <th className="noScroll" scope="col">
                Dienstende
              </th>
              <th className="noScroll" scope="col">
                Pause <br />
                Min.
              </th>
              <th className="noScroll" scope="col">
                Arbeitszeit <br />
                Std.
              </th>
              <th className=" noScroll" scope="col">
                Nacht <br />
                Std.
              </th>
              <th className=" noScroll" scope="col">
                Sonntag <br />
                Std.
              </th>
              <th scope="col " className="noScroll ">
                Feiertag <br />
                Std.
              </th>
              <th scope="col " className="noScroll ">
                VMA{" "}
              </th>
              <th className="noScroll " scope="col">
                Bereitschaft <br />
                Std.
              </th>
              <th className="noScroll " scope="col">
                Pkw. km
              </th>
              <th className="noScroll " scope="col">
                Bau. km
              </th>
              <th className="noScroll " scope="col">
                Ma. Transport
              </th>
              <th className="noScroll" scope="col">
                Qualifikation
              </th>
              <th className="noScroll" scope="col">
                Stdzettel
              </th>
              <th className="noScroll" scope="col">
                Status
              </th>
              <th className="noScroll" scope="col">Schicht Id</th>
            </tr>
          </thead>
          <tbody>
            {schichten &&
              schichten.map((s, index) => {
                const dateNow = moment().unix();
                const schichtStart = moment(s.date + " " + s.azbeginn).unix();
                if (dateNow > schichtStart) {
                az += parseFloat(s.arbeitszeit);
                na += parseFloat(s.nachtzuschlag);
                so += parseFloat(s.sonntagzuschlag);
                ft += parseFloat(s.feiertagzuschlag);
                vma += parseFloat(s.vma);
                mt += parseFloat(s.materialtransport);
                km += parseFloat(s.gesamtKm);
                let rowBackground;
              (index % 2)  ? rowBackground ="backgroundDark" : rowBackground="backgroundLight"
                return (
                  <EinzelSchicht
                    stripeRow={rowBackground}
                    key={s.id}
                    einsatzort={s.einsatzort}
                    Projektnr={s.projektnr}
                    auftragnr={s.auftragnr}
                    date={s.date}
                    azbeginn={s.azbeginn}
                    azende={s.azende}
                    pause={s.pause}
                    arbeitszeit={s.arbeitszeit}
                    nachtzuschlag={s.nachtzuschlag}
                    sonntagzuschlag={s.sonntagzuschlag}
                    feiertagzuschlag={s.feiertagzuschlag}
                    vma={s.vma}
                    bereitschaft={s.bereitschaft}
                    pkw_km={s.pkw_km}
                    baustellenkm={s.baustellenkm}
                    materialtransport={s.materialtransport}
                    qualifikation={s.qualGDI}
                    stdzettel={s.stdzettel}
                    freigabe={s.freigabe}
                    id={s.id}
                  />
                )
                ;
              }})}
          </tbody>
        </table>
      </div>

      <div  className="container mt-4 ml-2 summenContainer">
        <div className="row" >
          <div className="col-12 col-md-12 p-0">
            <h4
            style={{borderRadius: 5}}
              className="mb-4  minHeight60"
         
            >
              Monatssummen:{" "}
            </h4>
            <div className="d-flex flex-row justify-content-between w-100 mb-2">
              <div className="col-8 bld noScroll minHeight20">Arbeitszeit</div>
              <div className="col-4 text-right minHeight20">{parseFloat(az).toFixed(2)} Std.</div>
            </div>
            <div className="d-flex flex-row justify-content-between w-100 mb-2">
              <div className="col-8 bld noScroll minHeight20">Nachtstunden</div>
              <div className="col-4 text-right minHeight20">{parseFloat(na).toFixed(2)} Std.</div>
            </div>
            <div className="d-flex flex-row justify-content-between w-100 mb-2">
              <div className="col-8 bld noScroll minHeight20">Sonntagstunden</div>
              <div className="col-4 text-right minHeight20">{parseFloat(so).toFixed(2)} Std.</div>
            </div>
            <div className="d-flex flex-row justify-content-between w-100 mb-2">
              <div className="col-8 bld noScroll minHeight20">Feiertagstunden</div>
              <div className="col-4 text-right minHeight20">{parseFloat(ft).toFixed(2)} Std.</div>
            </div>
            <div className="d-flex flex-row justify-content-between w-100 mb-2 pt-2" style={{borderTop: "solid 1px #ffffff"}}>
              <div className="col-8 bld noScroll minHeight20">Verpflegunsmehraufwand</div>
              <div className="col-4 text-right minHeight20">{vma} €</div>
            </div>
            <div className="d-flex flex-row justify-content-between w-100 mb-2">
              <div className="col-8 bld noScroll minHeight20">Materialtransport</div>
              <div className="col-4 text-right minHeight20">{mt} €</div>
            </div>
            <div className="d-flex flex-row justify-content-between w-100 mb-2">
              <div className="col-8 bld noScroll minHeight20">Km Geld <span className="smallText">(nur freigegebene Schichten)</span></div>
              <div className="col-4 text-right minHeight20">{parseFloat(km * 0.30).toFixed(2)} €</div>
            </div>
            <div className="d-flex flex-row justify-content-between w-100 mb-2  pt-2" style={{borderTop: "solid 1px #ffffff"}}>
              <div className="col-8 bld noScroll minHeight20">Gesamtnettobeträge</div>
              <div className="col-4 text-right minHeight20 bld">{parseFloat((km * 0.30) + mt + vma).toFixed(2)} €</div>
            </div>
          </div>
        
      
        </div>
        
      </div>
    </>
  );
};

export default TableSchichten;
