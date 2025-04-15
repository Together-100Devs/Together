import HeaderButton from "./components/HeaderButton";
import TodayButton from "./components/TodayButton";

import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaHome, FaQuestion } from "react-icons/fa";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import MonthAndYear from "features/calendar/MonthAndYear";
import Logo from "../../assets/images/togetherLogo.svg";
import { useAuthContext } from "contexts/AuthContext";
import { useFormModalContext } from "contexts/FormModalContext";
import { useNavigate } from "react-router-dom";

function CalendarHeader({ date }) {
  const navigate = useNavigate();
  const formModal = useFormModalContext();
  const { isAuthenticated, logout } = useAuthContext();
  const DISCORD_THREAD_URL =
    "discord://discord.com/channels/735923219315425401/1038482732633825442";

  const GH_ISSUES_URL = "https://github.com/Caleb-Cohen/Together/issues";

  const linkToUrl = url => {
    window.open(url, "_blank");
  };

  const handleLogin = () => {
    window.location = "/auth/discord";
  };

  return (
    <header className="flex items-center max-[440px]:px-2 px-5 py-3 bg-white lg:justify-between w-full justify-center lg:flex-nowrap flex-wrap  max-[440px]:gap-x-2 gap-x-6 lg:gap-x-4 overflow-hidden">
      <section className="flex max-[440px]:gap-x-2 gap-x-6 lg:gap-x-4">
        <HeaderButton
          Icon={BsCalendarPlusFill}
          tooltipText="Add Event"
          onClick={formModal.handleOpen}
        />

        <HeaderButton
          Icon={MdGroupAdd}
          tooltipText="Join Team"
          onClick={() => linkToUrl(DISCORD_THREAD_URL)}
        />
        <HeaderButton
          Icon={FaHome}
          tooltipText={"Home"}
          onClick={() => navigate("/")}
        />
      </section>
      <section className="flex items-center w-full order-first lg:w-min lg:space-x-3 lg:order-none justify-between mb-4 lg:mb-0">
        <img src={Logo} className="max-w-none max-[380px]:w-9" alt="Logo" />
        <MonthAndYear
          month={date?.month}
          year={date?.year}
          handleNextMonth={date?.getNextMonth}
          handlePreviousMonth={date?.getPreviousMonth}
        />
        <TodayButton
          text={"Today"}
          tooltipText={"Jump to current month"}
          onClick={() => date.getCurrentMonth()}
        />
      </section>
      <section className="flex max-[440px]:gap-x-2 gap-x-6 lg:gap-x-4">
        <HeaderButton
          Icon={IoChatbubblesOutline}
          tooltipText="Feedback"
          onClick={() => linkToUrl(GH_ISSUES_URL)}
        />
        <HeaderButton
          Icon={FaQuestion}
          tooltipText="Help"
          onClick={() => linkToUrl(GH_ISSUES_URL)}
        />
        {isAuthenticated() ? (
          <HeaderButton
            Icon={RiArrowLeftCircleFill}
            tooltipText="Logout"
            onClick={logout}
          />
        ) : (
          <HeaderButton
            Icon={RiArrowRightCircleFill}
            tooltipText="Login"
            onClick={handleLogin}
          />
        )}
      </section>
    </header>
  );
}
export default CalendarHeader;
