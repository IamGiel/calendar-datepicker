import React, { useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import "./DatePicker.css";

export const DatePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDate = (dateInput: any) => {
    setStartDate(dateInput)
    
  };

  const handleEndDate = (dateInput: any) => {
    setEndDate(dateInput);
  };

  const onChangeStartDate = (event:any) => {
    setStartDate(event.target.value)
  }

  const onChangeEndDate = (event:any) => {
    setEndDate(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dateValues = { start: startDate, end: endDate };
    console.log(dateValues)
    setStartDate(dateValues.start)
    setEndDate(dateValues.end)
  };

  return (
    <div className="date-picker-container">
      <div className="datep-top-section">
        {/* <div className="start-label">START: {startDate?.toLocaleString()}</div> */}
        {/* <div className="end-label">END:{endDate?.toLocaleString()}</div> */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "12px",
            margin: "12px",
            padding: "12px",
          }}
        >
          <div className="start-label">
            START: &nbsp;&nbsp;
            <input
              id="start-id"
              type="text"
              placeholder="start date"
              value={`${startDate}`}
              onChange={onChangeStartDate}
            />
          </div>
          <div className="end-label">
            END: &nbsp;&nbsp;
            <input
              id="end-id"
              type="text"
              placeholder="end date"
              value={`${endDate}`}
              onChange={onChangeEndDate}
            />
          </div>
          <div className="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="bottom">
        <div className="selections"></div>
        <div className="calendar-section">
          <Calendar
            startDate={handleStartDate}
            endDate={handleEndDate}
            range={{ start: startDate, end: endDate }}
          />
        </div>
      </div>
    </div>
  );
};
