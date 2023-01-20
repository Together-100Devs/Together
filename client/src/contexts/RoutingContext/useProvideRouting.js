import { useState, useEffect } from "react";
import {useAuthContext} from '../AuthContext/'


const useProvideRouting = () => {
  const [currentPage, setCurrentPage] = useState('landingPage');
  const { user } = useAuthContext;
 
  // Redirect user to calendarPage on successful login:
  useEffect(() => {
    if (user != null) {
      setCurrentPage("calendarPage")
    }
  }, [user]);   
  

  return {
    currentPage,
    setCurrentPage
  } 
}

export default useProvideRouting;