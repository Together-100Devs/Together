// import readingLadySVG from "../../assets/images/readingLady.svg";
import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrTableAdd } from "react-icons/gr";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import Calendar from "../calendar/Calendar";
import CalendarHeader from "../calendarHeader";

function CalendarPage() {
  return (
    <main className="flex flex-col gap-3 p-3 shadow-sm">
      <CalendarHeader />

      <Calendar />
    </main>
  );
}
export default CalendarPage;
