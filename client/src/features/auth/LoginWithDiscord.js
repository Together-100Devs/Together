import React from "react";
import { useAuthContext } from "contexts/AuthContext";
import { useRoutingContext } from "contexts/RoutingContext";

const LoginWithDiscord = ({ DiscordIcon }) => {
  const auth = useAuthContext();
  const { setCurrentPage } = useRoutingContext();

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

// Redirect user to calendarPage on successful login:
  if (auth.isAuthenticated) {
    return (
      setCurrentPage("calendarPage")
    )}
  

  return (
    <div>
      <button onClick={auth.logout}>Logout</button>
    </div>
  );
};

export default LoginWithDiscord;
