import HamburgerNav from "./HamburgerNav";

const NavButtons = ({ HomeIcon, LoginIcon, CalendarIcon }) => {
  return (
    <div className="flex flex-row tablet:space-x-10">
      {/* Home Button */}
      <button class="bg-white hidden tablet:block overflow-hidden container box-border rounded-3xl border-2 border-black tablet:w-5/12 tablet:h-28 desktop:w-auto desktop:h-auto tablet:px-12 tablet:py-3 desktop:px-9 desktop:py-6">
        <div className="flex justify-center">
          <HomeIcon className="w-7 h-7 tablet:w-10 tablet:h-10 text-mainBlue" />
        </div>
        <div className="text-mainBlue font-black text-lg tablet:text-xl text-center">
          <span>Home</span>
        </div>
      </button>
      {/* Log In Button */}
      <button class=" hidden tablet:block overflow-hidden container box-border rounded-3xl border-2 border-black tablet:w-5/12 tablet:h-28 desktop:w-auto desktop:h-auto bg-white tablet:px-12 tablet:py-3 desktop:px-8 desktop:py-6">
        <div className="flex justify-center">
          <LoginIcon className="w-7 h-7 tablet:w-10 tablet:h-10 text-mainGreen" />
        </div>
        <div className="text-mainGreen font-black text-lg tablet:text-xl text-center">
          <span>Log In</span>
        </div>
      </button>
      {/* Calendar Button */}
      <button class="hidden tablet:block tablet:overflow-hidden container box-border rounded-3xl border-2 border-black tablet:w-5/12 tablet:h-28 desktop:w-auto desktop:h-auto bg-white tablet:px-12 tablet:py-3 desktop:px-5 desktop:py-6">
        <div className="flex justify-center">
          <CalendarIcon className="w-7 h-7 tablet:w-10 tablet:h-10 text-mainOrange" />
        </div>
        <div className="text-mainOrange font-black text-lg tablet:text-xl text-center">
          <span>Calendar</span>
        </div>
      </button>
      <HamburgerNav />
    </div>
  );
};

export default NavButtons;
