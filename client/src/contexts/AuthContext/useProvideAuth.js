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
      console.log(response.data)
      setUser(response.data);
      if (response.data instanceof Object) {
        setCurrentPage("calendarPage")
      }
    });
  }, [setCurrentPage]);
  
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

  // function check if user has needsToBeWelcome property
  const needsToBeWelcome = () => {
    return user.needsToBeWelcome;
  }

  // Delete property of needsToBeWelcome 
  const deleteNeedsToBeWelcome = () => {
    const updateUser = { ...user };
    delete updateUser.needsToBeWelcome;
    setUser(updateUser)
    DataService.deleteNeedsToBeWelcome();
  }

  return {
    user,
    logout,
    isAuthenticated,
    isNot100Dever,
    needsToBeWelcome,
    deleteNeedsToBeWelcome,
  };
};

export default useProvideAuth;
