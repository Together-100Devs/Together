import { FaHome, FaChevronCircleLeft, FaChevronCircleRight, FaRegCalendarAlt } from "react-icons/fa";

import { useAuthContext } from "client/contexts/AuthContext";

import LogoContainer from "./LogoContainer";
import NavButtons from "./NavButtons";

const NavContainer = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <nav className="hidden flex-row tablet:inline-flex justify-around desktop:justify-between w-[639px] tablet:w-full h-[130px] tablet:h-44 py-6 tablet:py-6 tablet:px-2">
      <LogoContainer logo={"./logoicon.png"} logotext={"./logotext.png"} />
      <NavButtons
        HomeIcon={FaHome}
        LoginIcon={isAuthenticated() ? FaChevronCircleLeft : FaChevronCircleRight}
        CalendarIcon={FaRegCalendarAlt}
      />
    </nav>
  );
};

export default NavContainer;

// lg:items-stretch
