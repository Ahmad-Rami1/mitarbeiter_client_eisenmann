import React, { useContext, useEffect } from "react";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Uebersicht from './pages/Uebersicht';
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { logout } from "./apiCalls";

import Eintragen from "./pages/Eintragen";
import Stdkonto from "./pages/Stdkonto";
function App() {

  const { user, dispatch} = useContext(AuthContext);

  function AuthRoute ({children}) {
    if(!user){
      //Not signed in
      return <Navigate to="/login" />
    }
    //Signed in
    return children
  }

  useEffect(() => {

    const timeStampNow =  +new Date;
    user?.expireAt*1000 < timeStampNow   && logout(dispatch) 
    

  }, [])

  return (
    <>
<Routes>
  <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
  <Route path="/schichtEintragen" element={<AuthRoute><Eintragen /></AuthRoute>} />
  <Route path="/login" element={<Login />} />
  <Route path="/uebersicht" element={<AuthRoute><Uebersicht /></AuthRoute>} />
  <Route path="/stdkonto" element={<AuthRoute><Stdkonto /></AuthRoute>} />
</Routes>



  </>
  );
}

export default App;
