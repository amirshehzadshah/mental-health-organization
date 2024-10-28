import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [state, setState] = useState({ 
    isModalOpen: false,
    isLoggedIn: false,
   });

  const openModal = () => setState({ isModalOpen: true });
  const closeModal = () => setState({ isModalOpen: false });

  const logIn = () => setState((prevState) => ({ ...prevState, isLoggedIn: true }));
  const logOut = () => setState((prevState) => ({ ...prevState, isLoggedIn: false }));

  return (
    <LoginContext.Provider value={{ state, openModal, closeModal, logIn, logOut }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginState = () => {
  return useContext(LoginContext);
};
