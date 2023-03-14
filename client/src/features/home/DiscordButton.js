import "../../index.css";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import { FaDiscord } from "react-icons/fa";

const DiscordButton = () => (
  <div className="flex border-2 border-slate-400 bg-white rounded-2xl">
    <div className="py-3 px-8 m-3 bg-discordBtn rounded-lg font-bold">
      <LoginWithDiscord DiscordIcon={FaDiscord} />
    </div>
  </div>
);

export default DiscordButton;
