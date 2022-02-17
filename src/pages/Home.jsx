import React from 'react'
import Navbar from '../components/Navbar'
import SchichtEintragen from '../components/SchichtEintragen'

const Home = () => {
  return (
    <div className="back" id="over" >
     <Navbar page="home" />
     <SchichtEintragen />
    </div>
  )
}

export default Home