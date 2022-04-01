import React from 'react'
import AktuellTable from '../components/AktuellTable'
import Navbar from '../components/Navbar'


const Home = () => {
  return (
    <div className="back" id="over" >
     <Navbar page="home" />
     <AktuellTable />
    </div>
  )
}

export default Home