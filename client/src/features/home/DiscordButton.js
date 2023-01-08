import "../../index.css";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import { FaDiscord } from "react-icons/fa";

const DiscordButton = () => (
  <div className="flex justify-center pt-10 tablet:pt-20">
    <div className=" flex w-64 tablet:w-5/6 border-2 border-slate-400 bg-white rounded-xl ">
      <button className="px-2 tablet:px-10 py-2 my-3 mx-auto bg-discordBtn rounded-lg tablet:text-xl font-bold">
        <LoginWithDiscord DiscordIcon={FaDiscord} />
      </button>
    </div>
  </div>
);

export default DiscordButton;
