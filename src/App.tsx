import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { DatePicker2 } from './datepicker2/DatePicker2';

function App() {

  return (
    <div className="App">
     <DatePicker2 
      pickertype={'range'} 
      numCalendar={3}
      // minStartDate={new Date()}
      // maxEndDate={new Date("May 2, 2023")}
     />
    </div>
  );
}

export default App;
