import { FC, useEffect, useState } from "react";
import {
  Calendar as CalendarType,
  useDatePickerContext,
} from "@rehookify/datepicker";
import { getDayClassName } from "../../helpers/classname-utils";

interface CalendarProps {
  calendar: CalendarType;
  dayclicked: (date?: Date) => void;
}

export const Calendar: FC<CalendarProps> = ({ calendar, dayclicked }) => {
  const {
    data: { weekDays },
    propGetters: { dayButton, previousMonthButton, nextMonthButton },
  } = useDatePickerContext();

  const { days, month } = calendar;
  // const { days } = calendar[monthIndex];
  // const month = calendar[monthIndex].month;

  
  useEffect(()=>{
    // console.log(calendar[0].days)
  },[calendar])
  
  
  const onClickedDay = (evt?: any, date?: Date) => {
    dayclicked(date)
  }

  // useEffect(() => {
  //   days.map((meta) => {
  //     console.log(meta.range)
  //     return meta
  //   })
  // }, [days, month])

  
  return (
    <section className="section-container">
        <div className="buttons" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'12px', margin:'12px 0px'}}>
            <div className="btn-left">
              <button {...previousMonthButton()}>◀️</button>
            </div>
            <header className="month-name">{month}</header>
            <div className="btn-right">
              <button {...nextMonthButton()}>▶️</button>
            </div>
        </div>
      <div
        className="grid7"
        style={{ justifyItems: "center" }}
      >
        {weekDays.map((dayNames) => (
          <p className="text-xs text-center">{dayNames}</p>
        ))}
      </div>
      <main
        className="grid7 grid grid-cols-7 gap-y-2"
        style={{ justifyItems: "center" }}
      >
        {days.map((dayNums:any) => (
          
          <button
            key={dayNums.$date.toString()}
            value={JSON.stringify(dayNums)}
            className={getDayClassName("w-8 text-xs", dayNums)}
            {...dayButton(dayNums, {onClick:onClickedDay})}
          >
            {dayNums.day}
          </button>
        ))}
      </main>
    </section>
  );
};
