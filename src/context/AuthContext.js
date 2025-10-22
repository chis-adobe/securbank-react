import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username, password) => {
    // Mock authentication - all logins work
    let userVariation = 'main';
    let offerId = 'investment-offer'; // default offer
    
    // Map specific users to variations
    if (username === 'student@scotiabank.com') {
      userVariation = 'student';
    }
    
    // Map specific users to offer IDs
    if (username === 'asmith@frescopa.coffee') {
      offerId = 'investment-offer';
      userVariation = 'genai_youngfamily';
    } else if (username === 'jdupont@frescopa.coffee') {
      offerId = 'mortgage-offer';
    }
    
    setUser({
      username,
      variation: userVariation,
      offerId: offerId
    });
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

