import Calendar from './components/Calendar';

function App() {
  return (
    <div>
      <Calendar />
      {/* Test Link for Discord Authorization. Link comes from discord developer tools, redirects back to localhost:3000 for now */}
      <a href="https://discord.com/api/oauth2/authorize?client_id=1039303417199345684&redirect_uri=https%3A%2F%2Ftogether.cyclic.app%2F&response_type=code&scope=identify%20email%20guilds%20guilds.join">Login With Discord</a>
    </div>
  )
}

export default App;
