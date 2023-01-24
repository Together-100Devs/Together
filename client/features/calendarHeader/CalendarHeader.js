import Image from "next/image"
import Link from "next/link";
import { BsCalendarPlusFill } from "react-icons/bs";
import { FaHome, FaQuestion } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdGroupAdd } from "react-icons/md";
import { RiArrowLeftCircleFill, RiArrowRightCircleFill } from "react-icons/ri";

import Logo from "client/assets/images/togetherLogo.svg";
import { useAuthContext } from "client/contexts/AuthContext";
import { useFormModalContext } from "client/contexts/FormModalContext";
import MonthAndYear from "client/features/calendar/MonthAndYear";

import HeaderButton from "./components/HeaderButton";

function CalendarHeader({ date }) {
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
    <header className="flex items-center px-5 py-2 bg-white justify-between">
      <section className="flex space-x-3">
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
        <Link href='/'>
          <HeaderButton
            Icon={FaHome}
            tooltipText={"Home"}
          />
        </Link>
      </section>
      <section className="flex items-center">
        <Image src={Logo} className="w-14" alt="Logo" />
        <MonthAndYear
          month={date?.month}
          year={date?.year}
          handleNextMonth={date?.getNextMonth}
          handlePreviousMonth={date?.getPreviousMonth}
        />
      </section>
      <section className="flex space-x-3">
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
