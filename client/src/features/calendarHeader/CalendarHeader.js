import HeaderButton from "./components/HeaderButton";
import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GrTableAdd } from "react-icons/gr";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { RiArrowLeftCircleFill } from "react-icons/ri";

function CalendarHeader() {
  return (
    <header className="flex items-center px-5 py-2 bg-white justify-between">
      <section className="flex space-x-2">
        <HeaderButton Icon={BsCalendarPlusFill} toolTipText="Add Event" />
        <HeaderButton Icon={MdGroupAdd} toolTipText="Join Team" />
      </section>
      <section>Month Component</section>
      <section className="flex space-x-2">
        <HeaderButton Icon={IoChatbubblesOutline} toolTipText="Feedback" />
        <HeaderButton Icon={FaQuestion} toolTipText="Help" />
        <HeaderButton Icon={RiArrowLeftCircleFill} toolTipText="Logout" />
      </section>
    </header>
  );
}
export default CalendarHeader;
