import React, {useEffect} from 'react'
import SchichtEintragen from '../components/SchichtEintragen'
import { useLocation } from 'react-router-dom';
import {Navigate } from "react-router-dom";





const Eintragen = () => {
 
  const { state } = useLocation();
 
 
 

  
  
  useEffect (() => {
    console.log(state)
  })



  if(!state){
    //Not signed in
    return <Navigate to="/" />
  }


  return (
    <div className="back" id="over" >
  
     <SchichtEintragen state = {state}/>
    </div>
  )
}

export default Eintragen