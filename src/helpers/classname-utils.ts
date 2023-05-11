import {
  CalendarDay,
  CalendarMonth,
  CalendarYear,
} from "@rehookify/datepicker";
import clsx from "clsx";

export const getDayClassName = (
  className: string,
  { selected, disabled, inCurrentMonth, now, range, day  }: CalendarDay,
) =>
  clsx(className, {
    "regular-day":day,
    "selected-days": selected && range !== "in-range",
    "cursor-not-allowed": disabled,
    "inCurrentMonth": !inCurrentMonth,
    "now": now,
    "range-start": range === "range-start",
    "range-end": range === "range-end",
    "range-start range-end": range === "range-start range-end",
    "will-be-range-start": range === "will-be-range-start",
    "will-be-range-end": range === "will-be-range-end",
    "will-be-in-range": range === "will-be-in-range",
    "in-range": range === "in-range",
  });

export const getMonthClassName = (
  className: string,
  { selected, now, disabled }: CalendarMonth
) =>
  clsx(className, {
    "selected-days": selected,
    "border border-slate-500": now,
    "opacity-25 cursor-not-allowed": disabled,
  });

export const getYearsClassName = (
  className: string,
  { selected, now, disabled }: CalendarYear
) =>
  clsx(className, {
    "selected-days": selected,
    "border border-slate-500": now,
    "opacity-25 cursor-not-allowed": disabled,
  });

export const getContainerClassName = (
  className: string,
  format: { grid?: boolean; flex?: boolean }
) =>
  clsx(className, {
    "displayGrid": format.grid,
    "displayFlex": format.flex,
  });
