import Calendar from './components/Calendar';

function App() {
  return (
    <div>
      <Calendar />
      {/* Test Link for Discord Authorization. Link comes from discord developer tools, redirects back to localhost:3000 for now */}
      <a href="https://discord.com/api/oauth2/authorize?client_id=1039303417199345684&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20guilds">Login With Discord</a>
    </div>
  )
}

export default App;
