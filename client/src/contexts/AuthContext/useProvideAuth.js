import { useState, useEffect } from "react";
import DataService from "services/dataService";
import { useRoutingContext } from "contexts/RoutingContext";
// Everything related to the user context will be inside of here: (CRUD)
// Allow us to check and modify any methods/functions in one place.   



const useProvideAuth = () => {
  const { setCurrentPage } = useRoutingContext();
  const [user, setUser] = useState(null);
 
  // Check if there is already a user session
  useEffect(() => {
    // If so, save user's information to the context
    DataService.getCurrentUser().then((response) => {
      setUser(response.data);
    });
  }, []);
  
  const logout = () => {
    DataService.logout();
    setUser(null);
    // On logout redirect to landingPage
    setCurrentPage("landingPage")
  };

  // To conditional render a component depending on if user's authenticated
  const isAuthenticated = () => {
    return !!user && user !== "User is not in 100Devs";
  };

  //create function that checks if the user is 100Dever
  const isNot100Dever = () => {
    return user === "User is not in 100Devs"
  }

  return {
    user,
    logout,
    isAuthenticated,
    isNot100Dever,
  };
};

export default useProvideAuth;
