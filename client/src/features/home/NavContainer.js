import LogoContainer from "./LogoContainer";
import NavButtons from "./NavButtons";
import { FaHome, FaChevronCircleRight, FaRegCalendarAlt } from "react-icons/fa";

const NavContainer = () => {
  return (
    <nav className="flex flex-row justify-around w-[639px] h-[130px] text-center py-6 tablet:flex-row tablet:justify-between tablet:h-44 box-border border-2 border-emerald-500 tablet:py-6 tablet:px-6">
      <LogoContainer logo={"/logoicon.png"} logotext={"/logotext.png"} />

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
