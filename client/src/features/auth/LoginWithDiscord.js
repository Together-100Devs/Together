import React from "react";
import { useAuthContext } from "contexts/AuthContext";


const LoginWithDiscord = ({ DiscordIcon }) => {
  const auth = useAuthContext();


  // If user is not authenticated; Render login button
  if (!auth.isAuthenticated()) {
    return (
      <form action="/auth/discord">
        <button
          className=" inline-flex w-52 tablet:w-auto pt-2 tracking-widest"
          type="submit"
        >
          <DiscordIcon className="w-7 h-7 mr-2" />
          Login with Discord
        </button>
      </form>
    );
  } 
  

  return (
    <div>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};

export default LoginWithDiscord;
