import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import publicRequest from "../requestMethods";
import moment from "moment";

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

  <tr className="">
    <td className="">{props.einsatzort} </td>
    <td scope="row" >{props.Projektnr} </td>
    <td className="">{props.auftragnr} </td>
    <td className="">{props.date.split("-").reverse().join(".")} </td>
    <td className="">{props.azbeginn} </td>
    <td className="">{props.azende} </td>
    <td className="">{props.pause} </td>
    <td className="">{props.arbeitszeit} </td>
    <td className="">{props.nachtzuschlag} </td>
    <td className="">{props.sonntagzuschlag} </td>
    <td className="">{props.feiertagzuschlag} </td>
    <td className="">{props.vma} </td>
    <td className="">{props.bereitschaft} </td>
    <td className="">{props.pkw_km} </td>
    <td className="">{props.baustellenkm} </td>
    <td className="">{props.materialtransport} </td>
    <td className="">{props.qualifikation} </td>
    <td className="">{props.stdzettel} </td>
    <td className="">{props.freigabe} </td>
    <td className="">{props.id} </td>
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
              <th className="" scope="col">
                Datum
              </th>
              <th className="" scope="col">
                Dienstbeginn
              </th>
              <th className="" scope="col">
                Dienstende
              </th>
              <th className="" scope="col">
                Pause <br />
                Min.
              </th>
              <th className="" scope="col">
                Arbeitszeit <br />
                Std.
              </th>
              <th className=" " scope="col">
                Nacht <br />
                Std.
              </th>
              <th className=" " scope="col">
                Sonntag <br />
                Std.
              </th>
              <th scope="col " className=" ">
                Feiertag <br />
                Std.
              </th>
              <th scope="col " className=" ">
                VMA{" "}
              </th>
              <th className=" " scope="col">
                Bereitschaft <br />
                Std.
              </th>
              <th className=" " scope="col">
                Pkw. km
              </th>
              <th className=" " scope="col">
                Bau. km
              </th>
              <th className=" " scope="col">
                Ma. Transport
              </th>
              <th className="" scope="col">
                Qualifikation
              </th>
              <th className="" scope="col">
                Stdzettel
              </th>
              <th className="" scope="col">
                Status
              </th>
              <th scope="col">Schicht Id</th>
            </tr>
          </thead>
          <tbody>
            {schichten &&
              schichten.map((s) => {
                az += parseFloat(s.arbeitszeit);
                na += parseFloat(s.nachtzuschlag);
                so += parseFloat(s.sonntagzuschlag);
                ft += parseFloat(s.feiertagzuschlag);
                vma += parseFloat(s.vma);
                mt += parseFloat(s.materialtransport);
                km += parseFloat(s.gesamtKm);

                return (
                  <EinzelSchicht
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
                    qualifikation={s.qualifikation}
                    stdzettel={s.stdzettel}
                    freigabe={s.freigabe}
                    id={s.id}
                  />
                );
              })}
          </tbody>
        </table>
      </div>

      <div class="container mt-4 p-4 ml-2 summenContainer flex-wrap">
        <div class="row ">
          <div class="col-12 col-md-6 ">
            <h4
              class="mb-4  minHeight60"
              style={{ borderBottom: "solid 1px #27348B" }}
            >
              Monatssummen:{" "}
            </h4>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Arbeitszeit</div>
              <div class="col-4 text-right minHeight20">{az} Std.</div>
            </div>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Nachtstunden</div>
              <div class="col-4 text-right minHeight20">{na} Std.</div>
            </div>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Sonntagstunden</div>
              <div class="col-4 text-right minHeight20">{so} Std.</div>
            </div>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Feiertagstunden</div>
              <div class="col-4 text-right minHeight20">{ft} Std.</div>
            </div>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Verpflegunsmehraufwand</div>
              <div class="col-4 text-right minHeight20">{vma} €</div>
            </div>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Materialtransport</div>
              <div class="col-4 text-right minHeight20">{mt} €</div>
            </div>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Km Geld</div>
              <div class="col-4 text-right minHeight20">{km * 0.30} €</div>
            </div>
            <div class="d-flex flex-row justify-content-between w-100 mb-2">
              <div class="col-8 bld noScroll minHeight20">Gesamtnettobeträge</div>
              <div class="col-4 text-right minHeight20">{(km * 0.30) + mt + vma} €</div>
            </div>
          </div>
        
      
        </div>
      </div>
    </>
  );
};

export default TableSchichten;
