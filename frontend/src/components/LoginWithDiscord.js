import React from 'react';

const LoginWithDiscord = () => {
  return (
    <form action="http://localhost:2121/auth/discord">
      <button type="submit">Login with Discord</button>
    </form>
  )
};

export default LoginWithDiscord;
