import "../../index.css";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import { FaDiscord } from "react-icons/fa";

const DiscordButton = () => (
  <div className="flex justify-center pt-10 tablet:pt-5">
    <div className=" flex w-64 tablet:w-auto border-2 border-slate-400 bg-white rounded-xl ">
      <div className="px-2 tablet:px-10 py-2 m-3 bg-discordBtn rounded-lg tablet:text-xl font-bold">
          <LoginWithDiscord DiscordIcon={FaDiscord}/>
      </div>
    </div>
  </div>
);

export default DiscordButton;
