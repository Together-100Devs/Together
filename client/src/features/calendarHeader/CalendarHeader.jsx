import HeaderButton from "./components/HeaderButton";
import TodayButton from "./components/TodayButton";

import { MdGroupAdd } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaHome, FaQuestion } from "react-icons/fa";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";
import MonthAndYear from "../calendar/MonthAndYear";
import Logo from "../../assets/images/togetherLogo.svg";
import { useAuthContext } from "../../contexts/AuthContext";
import { useFormModalContext } from "../../contexts/FormModalContext";
import { useNavigate } from "react-router-dom";

function CalendarHeader({ date }) {
  const navigate = useNavigate();
  const formModal = useFormModalContext();
  const { isAuthenticated, logout } = useAuthContext();
  const DISCORD_THREAD_URL =
    "discord://discord.com/channels/735923219315425401/1038482732633825442";

  const GH_ISSUES_URL = "https://github.com/Together-100Devs/Together/issues";

  const linkToUrl = (url) => {
    window.open(url, "_blank");
  };

  const handleLogin = () => {
    window.location = "api/auth/discord";
  };
  return (
    <header className="flex items-center max-[440px]:px-2 px-5 py-3 bg-white lg:justify-between w-full justify-center lg:flex-nowrap flex-wrap  max-[440px]:gap-x-2 gap-x-6 lg:gap-x-4">
      <section className="flex max-[440px]:gap-x-2 gap-x-6 lg:gap-x-4">
        <HeaderButton
          Icon={BsCalendarPlusFill}
          tooltipText="Add Event"
          onClick={formModal.handleOpen}
          aria-label="Add Event"
          title="Add Event"
        />

        <HeaderButton
          Icon={MdGroupAdd}
          tooltipText="Join Team"
          onClick={() => linkToUrl(DISCORD_THREAD_URL)}
          aria-label="Join Team"
          title="Join Team"
        />
        <HeaderButton
          Icon={FaHome}
          tooltipText={"Home"}
          onClick={() => navigate("/")}
          aria-label="Home"
          title="Home"
        />
      </section>
      <section className="flex items-center w-full order-first lg:w-min lg:space-x-3 lg:order-0 justify-between mb-4 lg:mb-0">
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
          aria-label="Today"
          title="Today"
        />
      </section>
      <section className="flex max-[440px]:gap-x-2 gap-x-6 lg:gap-x-4">
        <HeaderButton
          Icon={IoChatbubblesOutline}
          tooltipText="Feedback"
          onClick={() => linkToUrl(GH_ISSUES_URL)}
          aria-label="Feedback"
          title="Feedback"
        />
        <HeaderButton
          Icon={FaQuestion}
          tooltipText="Help"
          onClick={() => linkToUrl(GH_ISSUES_URL)}
          aria-label="Help"
          title="Help"
        />
        {isAuthenticated() ? (
          <HeaderButton
            Icon={RiArrowLeftCircleFill}
            tooltipText="Logout"
            onClick={logout}
            aria-label="Logout"
            title="Logout"
          />
        ) : (
          <HeaderButton
            Icon={RiArrowRightCircleFill}
            tooltipText="Login"
            onClick={handleLogin}
            aria-label="Login"
            title="Login"
          />
        )}
      </section>
    </header>
  );
}
export default CalendarHeader;
