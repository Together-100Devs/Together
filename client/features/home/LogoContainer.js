import Link from "next/link";

const LogoContainer = ({ logo, logotext }) => {
  return (
    <Link href="/">
      <button
        type="button"
        className="self-center p-3 hidden tablet:inline-flex desktop:inline-flex overflow-hidden rounded-3xl border-2 border-black laptop:w-5/12 tablet:h-28 desktop:w-auto desktop:h-auto bg-white tablet:px-auto tablet:py-3 desktop:px-10 desktop:py-5"
      >
        <img
          className=" hidden tablet:block w-14 tablet:w-20 tablet:h-20 desktop:w-auto desktop:h-20"
          src={logo}
          alt="logo icon"
        />
        <img
          className="hidden laptop:block tablet:w-2/3 tablet:h-20 desktop:w-auto desktop:h-20 border-b-4 border-mainOrange"
          src={logotext}
          alt="logo text"
        />
      </button>
    </Link>
  );
};

export default LogoContainer;
