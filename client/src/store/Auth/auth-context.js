import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  uuid: "",
  email: "",
  isDoctor: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredInfo = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");
  const storedEmail = localStorage.getItem("email");
  const storedUUID = localStorage.getItem("uuid");
  const storedIsDoctor = localStorage.getItem("isDoctor");

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("uuid");
    localStorage.removeItem("email");
    localStorage.removeItem("isDoctor");
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
    email: storedEmail,
    uuid: storedUUID,
    isDoctor: JSON.parse(storedIsDoctor),
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredInfo();
  let initialToken;
  let initialEmail;
  let initialUUID;
  let initialIsDoctor;
  if (tokenData) {
    initialToken = tokenData.token;
    initialEmail = tokenData.email;
    initialUUID = tokenData.uuid;
    initialIsDoctor = tokenData.isDoctor;
  }
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [uuid, setUUID] = useState(initialUUID);
  const [isDoctor, setIsDoctor] = useState(initialIsDoctor);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("uuid");
    localStorage.removeItem("email");
    localStorage.removeItem("isDoctor");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (data) => {
    setToken(data.token);
    setEmail(data.email);
    setUUID(data.uuid);
    setIsDoctor(data.isDoctor);
    localStorage.setItem("token", data.token);
    localStorage.setItem("expirationTime", data.expirationTime);
    localStorage.setItem("uuid", data.uuid);
    localStorage.setItem("email", data.email);
    localStorage.setItem("isDoctor", data.isDoctor);

    const remainingTime = calculateRemainingTime(data.expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    uuid,
    email,
    isDoctor,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
