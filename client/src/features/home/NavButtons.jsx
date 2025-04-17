import HamburgerNav from "./HamburgerNav";
import { useRoutingContext } from "contexts/RoutingContext";
import { useAuthContext } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NavButtons = ({ HomeIcon, LoginIcon, CalendarIcon }) => {
  const routing = useRoutingContext();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();

  const handleLogin = () => {
    window.location = "/auth/discord";
  };

  return (
    <div className="flex flex-row gap-2">
      {/* Home Button */}
      <button
        onClick={() => routing.setCurrentPage("landingPage")}
        className="bg-white border-2 border-black rounded-2xl flex flex-col justify-center items-center p-1 w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 focus:ring-4 focus:ring-black"
      >
        <div className="flex justify-center">
          <HomeIcon className="text-mainBlue w-7 h-7 lg:w-10 lg:h-10" />
        </div>
        <div className="text-mainBlue font-black text-lg lg:text-xl xl:text-2xl">
          <span>Home</span>
        </div>
      </button>
      {/* Log In & Log Out Button */}
      <button
        className="bg-white border-2 border-black rounded-2xl flex flex-col justify-center items-center p-1 w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 focus:ring-4 focus:ring-black"
        onClick={isAuthenticated() ? logout : handleLogin}
      >
        <div className="flex justify-center">
          <LoginIcon className="text-mainGreen w-7 h-7 lg:w-10 lg:h-10" />
        </div>
        <div className="text-mainGreen font-black text-lg lg:text-xl xl:text-2xl">
          <span>{isAuthenticated() ? "Log Out" : "Log In"}</span>
        </div>
      </button>
      {/* Calendar Button */}

      <button
        onClick={() => navigate("calendar")}
        className="bg-white border-2 border-black rounded-2xl flex flex-col justify-center items-center p-1 w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 focus:ring-4 focus:ring-black"
      >
        <div className="flex justify-center">
          <CalendarIcon className="text-mainOrange w-7 h-7 lg:w-10 lg:h-10" />
        </div>
        <div className="text-mainOrange font-black text-lg lg:text-xl xl:text-2xl">
          <span>Calendar</span>
        </div>
      </button>
      <HamburgerNav />
    </div>
  );
};

export default NavButtons;
