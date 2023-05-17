import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import "../src/datepicker2/DatePicker2.css"
import { DatePicker2 } from "./datepicker2/DatePicker2";
import { Selection } from "./datepicker2/selections/selection";

function App() {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const d: Date = new Date();
  const start = d.setMonth(d.getMonth());
  const end = d.setMonth(d.getMonth() + 1);

  const focusDate_start = new Date(start);
  const focusDate_end = new Date(end);

  const [selection, setSelection] = useState(null);

  const getnumDays = (range: any) => {
    console.log(range);
    setSelection(range);
    setTimeout(() => {
      setSelection(null)
    }, (300));
  };

  return (
    <>
      <div className="App">
        <div className="dp">
          <div className="dp-wrapper">
            <div className="selection">
              <Selection onselect={getnumDays} />
            </div>
            <div className="cl-section">
              <div className="calendars-here">
                <div className="date-picker">
                  <DatePicker2
                    pickertype={"range"}
                    numCalendar={1}
                    selectedDates={selectedDates}
                    onDatesChange={onDatesChange}
                    offset={[-1]}
                    focusDate={focusDate_start}
                    selection={selection}
                    // minStartDate={new Date()}
                    // maxEndDate={new Date("May 2, 2023")}
                  />
                </div>
                <div className="date-picker">
                  <DatePicker2
                    pickertype={"range"}
                    numCalendar={1}
                    selectedDates={selectedDates}
                    onDatesChange={onDatesChange}
                    offset={[0, 1]}
                    focusDate={focusDate_end}
                    selection={selection}
                  />
                </div>
              </div>
              <div className="date-labels-main">
                {/* <h1 className="dates-section">{formattedDates[0]}</h1> */}
                <h1 className="dates-section">
                  {selectedDates.length
                    ? `${new Date(selectedDates[0]).toLocaleDateString()}   -   ${new Date(selectedDates[1]).toLocaleDateString()}`
                    : ""}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
