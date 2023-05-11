import {
  DatePickerProvider,
  useDatePickerContext,
} from "@rehookify/datepicker";
import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar/Calendar";
import { Years } from "./years/Years";
import { Months } from "./months/Months";
import { Selection } from "./selections/selection";

interface IRoot {
  numCalendar: number;
}

interface IDateRange {
  start: any;
  end: any;
}

const Root = ({ numCalendar }: IRoot) => {
  const {
    data: { calendars, formattedDates, selectedDates },
    propGetters: { nextMonthButton, previousMonthButton, dayButton },
  } = useDatePickerContext();

  const [openMonth, setOpenMonth] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [numDays, setNumDays] = useState<any>(null);
  const [dateRange, setDateRange] = useState<IDateRange>({
    start: new Date(),
    end: null,
  });

  const onOpenMonth = (event: any) => {
    // console.log("event ", event.target.value);
    setOpenMonth(!openMonth);
  };

  const { month, year, days } = calendars[0];

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);

  const getFirstClicked = (date?: Date | undefined) => {
    console.log("day clicked from Calendar ", date);

    setDateRange({ ...dateRange, start: date });
    setNumDays(null);
  };

  const showMonthYearSelections = (open: boolean) => {
    // console.log("open", open);
    setOpenMonth(false);
    setOpenYear(open);
  };

  const getnumDays = (range: number) => {
    setNumDays(range);
  };

  return (
    <div className="d2picker-container ">
      <div className="button-main">
        <div className="month-btns">
          <button className="month-arr-btns" {...previousMonthButton()}>
            {"◀️"}
          </button>
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

          <button className="month-arr-btns" {...nextMonthButton()}>
            {"▶️"}
          </button>
        </div>
      </div>
      <main className="calendar-main">
        <div className="csub-interval-selections">
          <Selection onselect={getnumDays} />
        </div>

        <div className="csub-calendar">
          {[...Array(numCalendar)].map((item, idx) => {
            const reversedIdx = numCalendar - 1 - idx;
            const calendar = calendars[reversedIdx];
            calendars[reversedIdx].days = calendar.days.map((aday, id) => {

              const start = new Date(dateRange.start);
              const date = new Date(calendar.days[id].$date).toLocaleDateString()
              const end = new Date(start.getTime() + numDays * 24 * 60 * 60 * 1000).toLocaleDateString();

                if(
                    new Date(date).getTime() > new Date(start).getTime() &&
                    new Date(date).getTime() < new Date(end).getTime()
                  ){
                    if(selectedDates.length < 2){
                      selectedDates.push(new Date(end))
                    }
                    return { ...aday, selected:true, range:"in-range" };
                }

                if(numDays){
                 
                  selectedDates.splice(0, selectedDates.length)
                  console.log("++++++++++ ",start, new Date(end))
                  if(new Date(calendar.days[id].$date).getTime() === start.getTime()){
                   
                    return { ...aday, selected:true, range:"range-start" };
                  }
                  if(new Date(calendar.days[id].$date).getTime() === new Date(end).getTime()){
                    return { ...aday, selected:true, range:"range-end" };
                  }
                  selectedDates.push(start)
                  selectedDates.push(new Date(end))
                  return { ...aday, selected:false, range:"" };
                }
                
                
                
                if(!start && new Date(end).getTime() === new Date(date).getTime()){
                  return { ...aday, selected:true, range:"range-end" };
                } else if(!end && new Date(start).getTime() === new Date(date).getTime()){
                  return { ...aday, selected:true, range:"range-start" };
                } else if(date && !start && !end) {
                  return { ...aday, selected:false, range:"" };
                }


              
              return { ...aday };
            });

            return (
              <Calendar calendar={calendar} dayclicked={getFirstClicked} />
            );
            
          })}
        </div>
      </main>
      <div className="date-labels-main">
        <h1 className="dates-section">{formattedDates[0]}</h1>
        <h1 className="dates-section">
          {selectedDates.length
            ? `${selectedDates[0]}   -   ${selectedDates[1]}`
            : ""}
        </h1>
      </div>
    </div>
  );
};

interface IDatePicker {
  pickertype: "single" | "multiple" | "range";
  minStartDate?: Date | undefined;
  maxEndDate?: Date | undefined;
  numCalendar: number;
}

export const DatePicker2 = ({
  pickertype,
  minStartDate,
  maxEndDate,
  numCalendar
}: IDatePicker) => {
  const [selectedDates, onDatesChange] = useState<Date[]>([]);

  const validateNumCalendar = (value: number) => {
    if (value === 0 || value === 1 || value === 2) {
      return value;
    }
    return 2;
  };
  return (
    <DatePickerProvider
      config={{
        selectedDates,
        onDatesChange,
        dates: {
          mode: pickertype,
          minDate: minStartDate,
          maxDate: maxEndDate,
          // toggle: true,
        },
        calendar: {
          offsets: [-1,1]
        },
      }}
    >
      <Root numCalendar={validateNumCalendar(numCalendar)}/>
    </DatePickerProvider>
  );
};
