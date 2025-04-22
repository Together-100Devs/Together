import NavButtons404 from "./NavButtons404";
import LogoContainer from "features/home/LogoContainer";
import {
  FaHome,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function NavContainer404() {
  return (
    <>
      {/* <NavButtons404 /> */}
      <nav className="hidden md:flex justify-between w-full">
        <LogoContainer logo={"./logoicon.png"} logotext={"./logotext.png"} />
        <NavButtons404 HomeIcon={FaHome} CalendarIcon={FaRegCalendarAlt} />
      </nav>
    </>
  );
}
