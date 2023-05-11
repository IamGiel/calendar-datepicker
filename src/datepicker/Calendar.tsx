import React, { useEffect, useState } from "react";
import "./DatePicker.css";

import {useDatePicker} from "@rehookify/datepicker";
import { MonthsSelection } from "./MonthsSelection";

interface CalendarProps {
  startDate: any;
  endDate: any;
  range: {
    start: Date | null | string;
    end: Date | null | string;
  };
}

export const Calendar = (props: CalendarProps) => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);
  const [date, setDate] = useState<any>(props.range);
  const [toggleMonthYearBtn, setToggleMonthYearBtn] = useState(false)
  

  useEffect(() => {
    console.log(props.range)
    if(props.range){
        setDate({start:props.range.start, end:props.range.end})
    }
  }, [props])
  

  const {
    data: { weekDays, calendars },
    propGetters: { dayButton, previousMonthButton, nextMonthButton, monthButton },
  } = useDatePicker({
    selectedDates,
    onDatesChange,
  });

  //   const { previousMonthButton, nextMonthButton } = useContextMonthsPropGetters()

  const { month, days } = calendars[0];



  const [selectedMonth, setSelectedMonth] = useState(month)

  const onDayClick = (evt: any, clickedDate: Date) => {
    evt.stopPropagation();

    const { start, end } = date;

    if (!start) {
      setDate({ start: clickedDate, end: null });
    } else if (start && !end) {
      if (clickedDate < start) {
        setDate({ start: clickedDate, end: start });
        props.startDate && props.startDate(clickedDate);
        props.endDate && props.endDate(start); // add this line
      } else {
        setDate({ start: start, end: clickedDate });
        props.startDate && props.startDate(start);
        props.endDate && props.endDate(clickedDate); // add this line
      }
    } else {
      setDate({ start: clickedDate, end: null });
    }
    // props.startDate && props.startDate(start);
    // props.endDate && props.endDate(end);
  };

  const getPointClass = (thisday?: Date) => {
    if (!thisday) return false;
    const start = new Date(date.start);
    const end = new Date(date.end);

    // console.log("this day ", thisday.getTime())
    // console.log("start ", start.getTime())
    // console.log("end ", end.getTime())
    // determine if the thisday is start or end day
    if (thisday.getTime() === start.getTime()) {
      return "start-date";
    } else if (thisday.getTime() === end.getTime()) {
      return "end-date";
    } else {
      return false;
    }
  };

  const withinRange = (thisday?: Date) => {
    // console.log("this day ", thisday)
    // console.log("start ", new Date(date.start))
    // console.log("end ", new Date(date.end))
    const start = new Date(date.start);
    const end = new Date(date.end);
    if (thisday) {
      // determine that thisday is in range or not
      if (thisday >= start && thisday <= end) {
        // console.log("within range ✅ ");
        return "in-range";
      } else {
        // console.log("out of range");
        return "";
      }
    }
  };

  const getSelectedMonth = (sm:any) => {
    const selectedmonth = sm;
    console.log(selectedmonth)
    setSelectedMonth(selectedmonth.month)
  }

  useEffect(() => {
    console.log(props.range)
    console.log("calendar[0] ", calendars[0])
    props.startDate(props.range.start);
    props.endDate(props.range.end);
    setSelectedMonth(month)
  }, [date.start, date.end, month, props]);

  return (
    <section>
      {/* {selectedDates.length > 0 && <h1>{selectedDates[0].toDateString()}</h1>} */}
      <p>selected month: {selectedMonth}</p>
      <table>
        <thead>
          <tr>
            <th colSpan={1}>
              <button {...previousMonthButton()}>{"<"}</button>
            </th>
            <th colSpan={5}>
              <button className="monthyear-toggler" onClick={()=>setToggleMonthYearBtn(!toggleMonthYearBtn)}>{month}</button>
              {
                toggleMonthYearBtn && <div className="test-div" >
                  <MonthsSelection monthBtn={monthButton} theMonth={getSelectedMonth}  />
                </div>
              }
            </th>
            <th colSpan={1}>
              <button {...nextMonthButton()}>{">"}</button>
            </th>
          </tr>
          <tr>
            {weekDays.map((weekday) => (
              <th>{weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(7)].map((_, columnIndex) => {
                const index = rowIndex * 7 + columnIndex;
                const day: any = days[index];
                return (
                  <td
                    className={`days ${day.now ? "today" : ""} ${
                      day.inCurrentMonth ? "highlight" : "grayout"
                    } ${withinRange(day.$date)} ${getPointClass(day.$date)}`}
                    key={columnIndex}
                    {...dayButton(day, { onClick: onDayClick })}
                  >
                    <button>{day.day}</button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
