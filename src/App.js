import React, { useContext, useEffect } from "react";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Uebersicht from './pages/Uebersicht';
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { logout, loginCall } from "./apiCalls";
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
  <Route path="/login" element={<Login />} />
  <Route path="/uebersicht" element={<AuthRoute><Uebersicht /></AuthRoute>} />
</Routes>



  </>
  );
}

export default App;
