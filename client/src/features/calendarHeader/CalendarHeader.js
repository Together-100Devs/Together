import HeaderButton from "./components/HeaderButton";
import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import MonthAndYear from "features/calendar/MonthAndYear";
import useDate from "hooks/useDate";
import Logo from "../../assets/images/togetherLogo.svg";
import DataService from "services/dataService";
import { useContext } from "react";
import { Context } from "contexts/Context";

function CalendarHeader() {
  const date = useDate();
  const [context, setContext] = useContext(Context);

  const handleJoinClick = () => {
    window.open(
      "discord://discord.com/channels/735923219315425401/1038482732633825442",
      "_blank"
    );
  };

  const handleLogin = () => {
    window.location = "/auth/discord";
  };

  const handleLogout = () => {
    DataService.logout();
    setContext(context => ({
      ...context,
      user: null,
    }));
  };

  return (
    <header className="flex items-center px-5 py-2 bg-white justify-between">
      <section className="flex space-x-2">
        <HeaderButton Icon={BsCalendarPlusFill} toolTipText="Add Event" />
        <HeaderButton
          Icon={MdGroupAdd}
          toolTipText="Join Team"
          onClickFn={handleJoinClick}
        />
      </section>
      <section className="flex items-center">
        <img src={Logo} className="w-14" alt="Logo" />
        <MonthAndYear
          month={date.month}
          year={date.year}
          handleNextMonth={date.getNextMonth}
          handlePreviousMonth={date.getPreviousMonth}
        />
      </section>
      <section className="flex space-x-2">
        <HeaderButton Icon={IoChatbubblesOutline} toolTipText="Feedback" />
        <HeaderButton Icon={FaQuestion} toolTipText="Help" />
        {context.user ? (
          <HeaderButton
            onClickFn={handleLogout}
            Icon={RiArrowLeftCircleFill}
            toolTipText="Logout"
          />
        ) : (
          <HeaderButton
            onClickFn={handleLogin}
            Icon={RiArrowRightCircleFill}
            toolTipText="Login"
          />
        )}
      </section>
    </header>
  );
}
export default CalendarHeader;
