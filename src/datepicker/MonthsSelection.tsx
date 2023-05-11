import React, { MouseEvent, useEffect, useState } from 'react'
import './monthSelection.css'
import { useDatePicker, useDatePickerContext } from '@rehookify/datepicker';


interface MonthsSelectionProps {
    theMonth: (month: any) => void;
    monthBtn:any
  }

export const MonthsSelection = (props:MonthsSelectionProps) => {
    // const [months, setMonths] = useState(props.months)
    const {
        data: { months, calendars },
        propGetters: { dayButton, previousMonthButton, nextMonthButton, monthButton },
      } = useDatePicker({
      });

      const { month, days } = calendars[0];

    useEffect(() => {
      console.log(months)
    }, [])
    

    // const year = months[0].$date.getFullYear();
    // const submitMonth = (evt:any)=> {
    //     evt.preventDefault()
    //     const idx = evt.target.value
    //     const monthdata = months[idx]
    //     console.log(monthdata)
    //     props.monthdata(monthdata)
    // }
    return (
        <div className='month-selection'>
            <h1>Select a Month</h1>
            <div className='flex-container'>
                {months.map((m:any,key:any) => 
                    <div className='flex-item'>
                        <button className='month-btn' key={key} value={key}  onClick={()=>props.theMonth({...monthButton(m)})}>{m.month}</button>
                    </div>
                )}
            </div>
        </div>
    )
}
