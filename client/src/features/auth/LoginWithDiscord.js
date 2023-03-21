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
          <DiscordIcon className="w-7 h-7" />
          <span>Login with Discord</span>
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
        Logout
      </button>
    </div>
  );
};

export default LoginWithDiscord;
