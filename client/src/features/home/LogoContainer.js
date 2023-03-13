const LogoContainer = ({ logo, logotext }) => {
  return (
    <div className="rounded-2xl border-2 border-black bg-white px-5 flex justify-center items-center">
      <img
        className="w-10 h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
        src={logo}
        alt="logo icon"
      />
      <img
        className="h-10 lg:h-14 xl:h-16 border-b-4 border-mainOrange"
        src={logotext}
        alt="logo text"
      />
    </div>
  );
};

export default LogoContainer;
