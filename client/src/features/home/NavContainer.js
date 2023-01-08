import LogoContainer from "./LogoContainer";
import NavButtons from "./NavButtons";
import { FaHome, FaChevronCircleRight, FaRegCalendarAlt } from "react-icons/fa";

const NavContainer = () => {
  return (
    <nav className="hidden flex-row tablet:inline-flex justify-around desktop:justify-between w-[639px] tablet:w-full h-[130px] tablet:h-44 py-6 box-border border-2 border-emerald-500 tablet:py-6 tablet:px-2">
      <LogoContainer logo={"./logoicon.png"} logotext={"./logotext.png"} />
      <NavButtons
        HomeIcon={FaHome}
        LoginIcon={FaChevronCircleRight}
        CalendarIcon={FaRegCalendarAlt}
      />
    </nav>
  );
};

export default NavContainer;

// lg:items-stretch
