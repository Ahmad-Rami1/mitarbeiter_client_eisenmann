import React, {useState} from 'react'
import MonthBar from '../components/MonthBar'
import Navbar from '../components/Navbar'
import TableSchichten from '../components/TableSchichten'
import moment from 'moment'
const Uebersicht = () => {
  const [month, setMonth] = useState(moment().format('MM'));
  const [year, setYear] = useState((moment().year()).toString());

  const handleChangeMonth = (value) => {
    setMonth(value);

  }

  const handleChangeYear = (value) => {
    setYear(value);

  }

  return (
    <div className="back" id="over" >
        <Navbar  page="uebersicht"/>
        <MonthBar handleChangeMonth={handleChangeMonth} month={month}  handleChangeYear= {handleChangeYear} />
        <TableSchichten month={month} year ={year}/>
    </div>
  )
}

export default Uebersicht