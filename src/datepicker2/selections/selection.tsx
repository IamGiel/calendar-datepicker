import React from 'react'


interface ISelection {
    onselect: (selection: number) => void;
}
export const Selection = (props:ISelection) => {
    const onSelectedButton = (event:any, selection:any) => {
        console.log(event, selection)
        props.onselect(selection)
    }
  return (
    <div className='csub-interval-selections'>
            <button className='select-btns' onClick={(event)=> onSelectedButton(event, 0)}>Today</button>
            <button className='select-btns' onClick={(event)=> onSelectedButton(event, 7)}>7 Days</button>
            <button className='select-btns' onClick={(event)=> onSelectedButton(event, 30)}>30 Days</button>
            <button className='select-btns' onClick={(event)=> onSelectedButton(event, 60)}>60 Days</button>
            <button className='select-btns' onClick={(event)=> onSelectedButton(event, 180)}>180 Days</button>
            <button className='select-btns' onClick={(event)=> onSelectedButton(event, 360)}>360 Days</button>
    </div>
  )
}
