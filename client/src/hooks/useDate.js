import { useState } from "react";

import getDaysInMonth from "date-fns/getDaysInMonth";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import startOfMonth from "date-fns/startOfMonth";
import format from "date-fns/format";

// Current date
const useDate = () => {
  const [date, setDate] = useState(new Date());
  const year = getYear(date);
  // Month in string format; e.g. 'November'
  const month = format(date, "LLLL");
  const monthStart = new Date(date.getFullYear(), date.getMonth()).getTime();
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1).getTime();
  const daysInMonth = getDaysInMonth(date);
  // First day of the month; e.g. 'Tue'
  const firstDay = format(startOfMonth(date), "E");

  const getNextMonth = () => {
    setDate(prevDate => new Date(getYear(prevDate), getMonth(prevDate) + 1));
  };

  const getPreviousMonth = () => {
    setDate(prevDate => new Date(getYear(prevDate), getMonth(prevDate) - 1));
  };

  return {
    year,
    month,
    monthStart,
    monthEnd,
    daysInMonth,
    firstDay,
    getNextMonth,
    getPreviousMonth,
  };
};

export default useDate;
