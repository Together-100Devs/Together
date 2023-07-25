import "../../index.css";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import { FaDiscord } from "react-icons/fa";

const DiscordButton = () => (
  <>
    <LoginWithDiscord DiscordIcon={FaDiscord} />
  </>
);

export default DiscordButton;
