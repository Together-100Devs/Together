import React, {useContext} from "react";
import { Context } from "contexts/Context";
import DataService from "services/dataService";

const LoginWithDiscord = () => {
  const [context, setContext] = useContext(Context)
  return (
    <>
      {!context.user && 
        <form action="/auth/discord">
          <button type="submit">Login with Discord</button>
        </form>
      }
      {context.user &&
        <button onClick={() => {
          DataService.logout()
          context.user = null
          setContext({...context})
        }}>Logout</button>
      }
    </>
  );
};

export default LoginWithDiscord;
