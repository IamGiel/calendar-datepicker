import { useDatePickerContext } from "@rehookify/datepicker";
import { getYearsClassName } from "../../helpers/classname-utils";
// import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// import { getYearsClassName } from '../classnames-utils';
// import { Section } from './section';
// import { SectionHeader } from './section-header';
// import { Button } from './button';

export const Years = (props:any) => {
    const {
        data: { years },
        propGetters: {
            previousYearsButton,
            nextYearsButton,
            yearButton,
        }
    } = useDatePickerContext();

  function handleYearClick(year: any) {
    props.onYearClick(false)
  }

    return (
        <section>
          <section className="year-nav-section">
            <button className="w-8" {...previousYearsButton()}>
            {"◀️"}
            </button>
            <p className="text-center text-sm" style={{width:'300px'}}>
              {`${years[0].year} - ${years[years.length - 1].year}`}
            </p>
            <button className="w-8" {...nextYearsButton()}>
            {"▶️"}
            </button>
          </section>
          <main className="grid grid-cols-3 items-center gap-x-2 gap-y-2">
            {years.map((y) => (
              <button 
                key={y.$date.toString()} 
                className={getYearsClassName("text-xs", y)}
                {...yearButton(y, { onClick: ()=> handleYearClick(y.year)})}
              >
                {y.year}
              </button>
            ))}
          </main>
        </section>
    );
}