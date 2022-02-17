import React, {useContext, useState, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import {loginCall} from "../apiCalls"
import { useNavigate  } from "react-router-dom";
const Login = () => {
  const { user, dispatch, isFetching, error  } = useContext(AuthContext);
  const navigate = useNavigate();
const [userCredentials, setUserCredentials] =  useState({
  username: "",
  passwort: ""
})

const submitHandler = () =>{
  loginCall(userCredentials, dispatch)
}

useEffect(() => {
  if(user){
     navigate('/')
   }else{
     navigate('/login')
   }


},[user])

  return (
    <div className="back" id="over">
      <div className="d-flex justify-content-center">
        <div className="pt-5 px-2 rounded">
          <h2 className="loginHeader noScroll">Eisenmann Services</h2>
          <div className="form-group">
            <label className="credentials" for="exampleInputEmail1">
              Benutzername
            </label>
            <input
              type="text"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Benutzername eingeben"
onChange={(e) => {setUserCredentials({...userCredentials, username:e.target.value})}}
              required
            />
          </div>
          <div className="form-group">
            <label className="credentials" for="exampleInputPassword1">
              Passwort
            </label>
            <input
              type="password"
           
              className="form-control "
              id="exampleInputPassword1"
              placeholder="Passwort eingeben"
              onChange={(e) => {setUserCredentials({...userCredentials, password :e.target.value})}}  
              required
            />
          </div>
          <button
            onClick={submitHandler}
            className="btn w-100 btn-primary dispoLoginButton"
            disabled={isFetching}
          >
            anmelden
          </button>
          <div style={{color:"#fff"}}>
        {error &&"falsche zugangsdaten"}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
