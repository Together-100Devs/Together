import "../../index.css";
import LoginWithDiscord from "features/auth/LoginWithDiscord";

const DiscordButton = () => (
  <div className="flex justify-center pt-10 tablet:pt-20">
    <div className=" flex w-56 tablet:w-[21rem] border-2 border-slate-400 bg-white rounded-xl ">
      <button className="px-3 tablet:px-6 py-2 my-3 mx-auto bg-discordBtn rounded-lg tablet:text-2xl font-bold">
        <LoginWithDiscord />
      </button>
    </div>
  </div>
);

export default DiscordButton;
