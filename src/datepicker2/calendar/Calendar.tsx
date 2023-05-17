import { FC, useEffect, useState } from "react";
import {
  Calendar as CalendarType,
  useDatePickerContext,
} from "@rehookify/datepicker";
import { getDayClassName } from "../../helpers/classname-utils";
import "../DatePicker2.css";
import { Months } from "../months/Months";
import { Years } from "../years/Years";

interface CalendarProps {
  calendarPassed: CalendarType;
  dayclicked: (date?: Date) => void;
  next: any;
  prev: any;
}

export const Calendar: FC<CalendarProps> = ({
  calendarPassed,
  dayclicked,
  next,
  prev,
}) => {
  const {
    data: { weekDays },
    propGetters: { dayButton, previousMonthButton, nextMonthButton },
  } = useDatePickerContext();

  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);

  const { days, month, year } = calendarPassed;
  // const { days } = calendar[monthIndex];
  // const month = calendar[monthIndex].month;

  const onClickedDay = (evt?: any, date?: Date) => {
    dayclicked(date);
  };

  const onOpenMonth = (event: any) => {
    // console.log("event ", event.target.value);
    setOpenMonth(!openMonth);
  };
  const showMonthYearSelections = (open: boolean) => {
    // console.log("open", open);
    setOpenMonth(false);
    setOpenYear(open);
  };

  return (
    <section className="section-container">
      <div
        className="buttons"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "12px",
          margin: "12px 0px",
        }}
      >
        {/* <div className="btn-left">
          <button {...prev}>◀️</button>
        </div> */}
        <div className="button-main">
          <div className="month-btns">
            <div className="btn-left">
              <button {...prev}>◀️</button>
            </div>
            <div className="month-toggler">
              <button className="month-label" onClick={onOpenMonth}>
                {month} {year}
              </button>
              {openMonth && (
                <div className="toggled-m-y-container">
                  <Months onMonthClick={showMonthYearSelections} />
                </div>
              )}
              {openYear && (
                <div className="toggled-m-y-container">
                  <Years onYearClick={showMonthYearSelections} />
                </div>
              )}
            </div>
            <div className="btn-right">
              <button {...next}>▶️</button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid7" style={{ justifyItems: "center" }}>
        {weekDays.map((dayNames) => (
          <p className="text-xs text-center">{dayNames}</p>
        ))}
      </div>
      <main
        className="grid7 grid grid-cols-7 gap-y-2"
        style={{ justifyItems: "center" }}
      >
        {days.map((dayNums: any) => (
          <button
            key={dayNums.$date.toString()}
            value={JSON.stringify(dayNums)}
            className={getDayClassName("w-8 text-xs", dayNums)}
            {...dayButton(dayNums, { onClick: onClickedDay })}
          >
            {dayNums.day}
          </button>
        ))}
      </main>
    </section>
  );
};
