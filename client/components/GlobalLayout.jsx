import React from 'react';
import { useAuthContext } from 'client/contexts/AuthContext';

const GlobalLayout = ({ children }) => {
  const auth = useAuthContext();
  console.log('test');
  const isAuthenticated = auth.isAuthenticated();

  return (
    <>
      {isAuthenticated && (
        <h3>Hello, {auth.user.displayName}, welcome to Together!</h3>
      )}
      {children}
    </>
  )
};

export default GlobalLayout;