import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenicate, setIsAuthenicate] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenicate, setIsAuthenicate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
