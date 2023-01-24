import Link from "next/link";

import { useAuthContext } from "client/contexts/AuthContext";

import HamburgerNav from "./HamburgerNav";

const NavButtons = ({ HomeIcon, LoginIcon, CalendarIcon }) => {
  const { isAuthenticated, logout } = useAuthContext();

  const handleLogin = () => {
    window.location = "/auth/discord"
  }

  return (
    <div className="flex flex-row self-center tablet:space-x-2">
      {/* Home Button */}
      <Link href='/'>
        <button
          type="button"
          className="bg-white hidden tablet:block overflow-hidden container box-border rounded-3xl border-2 border-black tablet:w-auto desktop:5/12 tablet:h-28 desktop:w-auto desktop:h-auto tablet:px-8 tablet:py-3 desktop:px-9 desktop:py-6"
        >
          <div className="flex justify-center">
            <HomeIcon className="w-7 h-7 tablet:w-10 tablet:h-10 text-mainBlue" />
          </div>
          <div className="text-mainBlue font-black text-lg tablet:text-xl text-center">
            <span>Home</span>
          </div>
        </button>
      </Link>
      {/* Log In & Log Out Button */}
      <button className="hidden tablet:block overflow-hidden container box-border rounded-3xl border-2 border-black tablet:w-auto desktop:5/12 tablet:h-28 desktop:h-auto bg-white tablet:px-8 tablet:py-3 desktop:px-8 desktop:py-6" 
        onClick={isAuthenticated() ? logout : handleLogin}>
        <div className="flex justify-center">
          <LoginIcon className="w-7 h-7 tablet:w-10 tablet:h-10 text-mainGreen" />
        </div>
        <div className="text-mainGreen font-black text-lg tablet:text-xl text-center">
          <span>{isAuthenticated() ? "Log Out" : "Log In"}</span>
        </div>
      </button>
      {/* Calendar Button */}
      <Link href='/calendar'>
        <button
          type="button"
          className="hidden tablet:block tablet:overflow-hidden container box-border rounded-3xl border-2 border-black tablet:w-auto desktop:5/12 tablet:h-28 desktop:w-auto desktop:h-auto bg-white tablet:px-5 tablet:py-3 desktop:px-5 desktop:py-6"
        >
          <div className="flex justify-center">
            <CalendarIcon className="w-7 h-7 tablet:w-10 tablet:h-10 text-mainOrange" />
          </div>
          <div className="text-mainOrange font-black text-lg tablet:text-xl text-center">
            <span>Calendar</span>
          </div>
        </button>
      </Link>
      <HamburgerNav />
    </div>
  );
};

export default NavButtons;
