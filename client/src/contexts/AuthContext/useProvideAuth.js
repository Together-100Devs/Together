import { useState, useEffect } from "react";
import DataService from "services/dataService";
import { useNavigate } from "react-router-dom";

// Everything related to the user context will be inside of here: (CRUD)
// Allow us to check and modify any methods/functions in one place.

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Check if there is already a user session
  useEffect(() => {
    // If so, save user's information to the context
    DataService.getCurrentUser().then(response => {
      console.log(response.data);
      setUser(response.data);
      setLoading(false); // set loading to false after fetching user data
    });
  }, []);

  const logout = () => {
    DataService.logout();
    setUser(null);
    // On logout redirect to landingPage
    navigate("/");
  };

  // To conditional render a component depending on if user's authenticated
  const isAuthenticated = () => {
    return !!user && user !== "User is not in 100Devs";
  };

  //create function that checks if the user is 100Dever
  const isNot100Dever = () => {
    return user === "User is not in 100Devs";
  };

  // function check if user has needsToBeWelcome property
  const needsToBeWelcome = () => {
    return user.needsToBeWelcome;
  };

  // Delete property of needsToBeWelcome
  const deleteNeedsToBeWelcome = () => {
    const updateUser = { ...user };
    delete updateUser.needsToBeWelcome;
    setUser(updateUser);
    DataService.deleteNeedsToBeWelcome();
  };

  // Check if user is not null and user has role of admin.
  const isAdmin = () => {
    return user ? user.role === "admin" : false;
  };

  return {
    user,
    logout,
    isAuthenticated,
    isAdmin,
    isNot100Dever,
    needsToBeWelcome,
    deleteNeedsToBeWelcome,
    loading,
  };
};

export default useProvideAuth;
