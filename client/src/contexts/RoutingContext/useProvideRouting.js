import { useState, useEffect } from "react";
import {useAuthContext} from '../AuthContext/'


const useProvideRouting = () => {
  const [currentPage, setCurrentPage] = useState('landingPage');

  return {
    currentPage,
    setCurrentPage
  } 
}

export default useProvideRouting;