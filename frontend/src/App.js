import React from 'react'
import Calendar from './components/Calendar';
import LoginWithDiscord from './components/form/LoginWithDiscord'
import UserForm from './components/form/UserForm'

function App() {
  return (
    <div>
      <LoginWithDiscord />
      <Calendar />
     <div className ="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <UserForm/>
     </div>
    </div>
  )
}

export default App;
