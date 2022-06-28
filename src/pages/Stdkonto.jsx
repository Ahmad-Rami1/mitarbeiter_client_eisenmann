import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import publicRequest from "../requestMethods";
import StdKontoForm from "../components/StdKontoForm";
import StdKontoTable from "../components/StdKontoTable";
import LoadingComp from "../components/LoadingComp";

const Stdkonto = () => {
  const { user } = useContext(AuthContext);
  const config = {
    headers: { Authorization: `Bearer ${user.jwt}` },
  };

  const [stdkontoData, setStdkontoData] = useState({});
  const [monatsArbeitszeit, setMonatsArbeitszeit] = useState({});
  const [latestStdkontoImLohn, setLatestStdkontoImLohn] = useState({});
  const [refresher, setRefresher] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleRefresher = (value) => {
    setRefresher(value);
  };

  useEffect(() => {
    const checkStdkonto = async () => {
      const res = await publicRequest.get(
        `/stdkonto/check_stdkonto.php?mitarbeiter_id=${user.id}`,
        config
      );

      const res2 = await publicRequest.get(
        `/schicht/get_summe_arbeitszeit_ma.php?mitarbeiter_id=${user.id}`,
        config
      );

      const res3 = await publicRequest.get(
        `/summe/get_latest_summe.php?mitarbeiter_id=${user.id}`,
        config
      );

      await setStdkontoData(res.data);
      await setMonatsArbeitszeit(res2.data);
      await setLatestStdkontoImLohn(res3.data);
      await setLoading(false);
    };
    checkStdkonto();
  }, [user.id, refresher]);
  return (
    <div className="back" id="over">
      <Navbar page="stdkonto" />
      {loading ? (
        <LoadingComp />
      ) : stdkontoData.message === "can enter" ? (
        <StdKontoForm
          arbeitszeit={monatsArbeitszeit}
          stdkonto={latestStdkontoImLohn}
          refreshHandler={handleRefresher}
        />
      ) : stdkontoData.message === "stdkonto already exists" ? (
        <StdKontoTable stdkontoData={stdkontoData} />
      ) : (
        <div
          className="container text-center mt-4 maxWidth500"
      
        >
          <h4 className="noScroll text-white">
            Ihre Lohn wurde bereits bearbeitet. Daher kann keinen
            Stundenkontoübertrag erfolgen.
          </h4>
        </div>
      )}

      {/* <h1>{stdkontoData.message}</h1> */}
    </div>
  );
};

export default Stdkonto;
