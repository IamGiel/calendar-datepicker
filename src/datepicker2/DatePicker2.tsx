/* eslint-disable react-hooks/exhaustive-deps */
import {
  CalendarDay,
  DatePickerProvider,
  useDatePickerContext,
} from "@rehookify/datepicker";
import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar/Calendar";
import { Years } from "./years/Years";
import { Months } from "./months/Months";
import { Selection } from "./selections/selection";
import { setYear } from "@rehookify/datepicker/dist/state-reducer";

interface IDateRange {
  start: any;
  end: any;
}

interface IRoot {
  selection: any;
}
interface IDatePicker {
  pickertype: "single" | "multiple" | "range";
  minStartDate?: Date | undefined;
  maxEndDate?: Date | undefined;
  numCalendar: number;
  selectedDates: any;
  onDatesChange: any;
  offset: number[];
  focusDate: Date;
  selection: any;
}

export const Root = (props: any) => {
  const {
    data: { calendars, formattedDates, selectedDates },
    propGetters: { nextMonthButton, previousMonthButton, dayButton },
    actions: {setMonth}
  } = useDatePickerContext();

  // const [openYear, setOpenYear] = useState(false);
  const [dateRange, setDateRange] = useState<IDateRange>({
    start: null,
    end: null,
  });

  // const onOpenMonth = (event: any) => {
  //   // console.log("event ", event.target.value);
  //   setOpenMonth(!openMonth);
  // };
  const { month, year, days } = calendars[1];
  const [calendar_, setCalendar_] = useState(calendars[1])

  useEffect(() => {
    // console.log("props.selection = ", props.selection);
    calendarSetting()
  }, [calendars]);


  // props.selection = the group of days user selects

  const calendarSetting = () => {
    console.log(props.selection)
    console.log(selectedDates)
    
    if(props.selection){
      let start = selectedDates[0]
      let end = new Date(start.getTime() + props.selection * 24 * 60 * 60 * 1000)
      selectedDates.splice(0, selectedDates.length)
      if(props.selection===0){
        setMonth(new Date())
      }
      selectedDates.push(start)
      selectedDates.push(end)

      
    }
   
    
    const currentDate = new Date();
    let startDate = currentDate.getTime();
    let endDate =  new Date(currentDate.getTime() + props.selection * 24 * 60 * 60 * 1000)
    
    calendars[1].days = calendars[1].days.map((currentDay: CalendarDay, id: any) => {
      const iterDay = new Date(currentDay.$date)
      if(currentDay.range === "will-be-range-start"){
        return {...currentDay}
      } else {
        return {...currentDay}
      }
      
    });
    
    setCalendar_(calendars[1])
  };
  

  const getFirstClicked = (date?: Date | undefined) => {
    console.log("day clicked from Calendar ", date);

    setDateRange({ ...dateRange, start: date });
  };

  return (
    <div className="d2picker-container">
      <main className="calendar-main">
        <div className="csub-calendar">
          {/* <p>{JSON.stringify(calendars[1].days)}</p> */}
          <div>
            <Calendar
              calendarPassed={calendar_}
              dayclicked={getFirstClicked}
              prev={previousMonthButton()}
              next={nextMonthButton()}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export const DatePicker2 = ({
  pickertype,
  minStartDate,
  maxEndDate,
  numCalendar,
  selectedDates,
  onDatesChange,
  offset,
  focusDate,
  selection,
}: IDatePicker) => {
  return (
    <DatePickerProvider
      config={{
        selectedDates,
        onDatesChange,
        focusDate: focusDate,
        dates: {
          mode: pickertype,
          minDate: minStartDate,
          maxDate: maxEndDate,
          toggle: true,
        },
        calendar: {
          offsets: offset,
        },
      }}
    >
      <Root selection={selection} />
    </DatePickerProvider>
  );
};
