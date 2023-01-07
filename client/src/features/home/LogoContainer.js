const LogoContainer = ({ logo, logotext }) => {
  return (
    <button class="flex self-center p-3 tablet:inline-flex desktop:inline-flex overflow-hidden rounded-3xl border-2 border-black tablet:w-5/12 tablet:h-28 desktop:w-auto desktop:h-auto bg-white tablet:px-12 tablet:py-3 desktop:px-10 desktop:py-5">
      <img
        className=" w-14 tablet:w-20 tablet:h-20 desktop:w-auto desktop:h-20"
        src={logo}
        alt="logo icon"
      />
      <img
        className="hidden tablet:block tablet:w-2/3 tablet:w-34 tablet:h-20 desktop:w-auto desktop:h-20 border-b-4 border-mainOrange"
        src={logotext}
        alt="logo text"
      />
    </button>
  );
};

export default LogoContainer;
