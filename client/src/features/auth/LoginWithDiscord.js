import React from "react";
import { useAuthContext } from "contexts/AuthContext";

const LoginWithDiscord = ({ DiscordIcon }) => {
  const auth = useAuthContext();

  // If user is not authenticated; Render login button
  if (!auth.isAuthenticated()) {
    return (
      <form action="/auth/discord">
        <button
          className="flex items-center justify-center tracking-widest gap-3"
          type="submit"
        >
          <div className="flex border-2 border-slate-400 bg-white rounded-2xl">
            <div className="flex flex-row space-x-3 py-3 px-8 m-3 bg-discordBtn rounded-lg font-bold">
              <DiscordIcon className="w-7 h-7" />
              <span>Login with Discord</span>
            </div>
          </div>
        </button>
      </form>
    );
  }

  return (
    <div>
      <button
        onClick={auth.logout}
        className="flex items-center justify-center tracking-widest gap-3"
      >
        <div className="flex border-2 border-slate-400 bg-white rounded-2xl">
          <div className="py-3 px-8 m-3 bg-discordBtn rounded-lg font-bold">
            Logout
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoginWithDiscord;
