import React, { useContext } from "react";
import { Context } from "contexts/Context";
import DataService from "services/dataService";

const LoginWithDiscord = ({ DiscordIcon }) => {
  const [context, setContext] = useContext(Context);
  return (
    <div>
      {!context.user && (
        <form action="/auth/discord">
          <button
            className=" inline-flex w-52 tablet:w-auto pt-2 tracking-widest"
            type="submit"
          >
            <DiscordIcon className="w-7 h-7 mr-2" />
            Login with Discord
          </button>
        </form>
      )}
      {context.user && (
        <button
          onClick={() => {
            DataService.logout();
            context.user = null;
            setContext({ ...context });
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginWithDiscord;
