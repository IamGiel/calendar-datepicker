import { useDatePickerContext } from "@rehookify/datepicker"

import '../DatePicker2.css'
import { getMonthClassName } from "../../helpers/classname-utils";
import { HeaderComponent } from "../../subcomponents/HeaderComponent";
// import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// import { getMonthClassName } from '../classnames-utils';
// import { Section } from './section';
// import { SectionHeader } from './section-header';
// import { Button } from './button';

export const Months = (props:any) => {
    const {
        data: { months },
        propGetters: {
            // previousMonthButton,
            // nextMonthButton,
            monthButton,
        }
    } = useDatePickerContext();
    
    const year = months[0].$date.getFullYear();
    
    function handleMonthClick(month:any) {
      props.onMonthClick(month);
    }

    return (
        <section>
          <HeaderComponent containerClass={`header-comp-container`} childClass={`child-of-header`}>
            {/* <button className="previous-mbtn" {...previousMonthButton()}>
              {"👈"}
            </button>
            <p className="">{year}</p>
            <button className="next-m-btn" {...nextMonthButton()}>
              {"👉"}
            </button> */}
          </HeaderComponent>
          <main className="grid grid-cols-3 items-center gap-x-2 gap-y-2">
            {months.map((m) => (
              <button
                key={m.month + year}
                className={getMonthClassName("text-xs", m)}
                {...monthButton(m, { onClick: () => handleMonthClick(m.month) })}
                >
                {m.month}
              </button>
            ))}
          </main>
        </section>
    );
}