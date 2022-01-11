import React, { useEffect, useState, createContext } from "react";
// import { withRouter } from "react-router-dom";
import { getUserInfo } from "../api";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({
    _id: "",
    registrationComplete: "",
    role: "",
    userType: "",
    token: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo({})
        .then((response) => {
          setUser({
            _id: response.data.user._id,
            registrationComplete: response.data.user.registrationComplete,
            role: response.data.user.role,
            userType: response.data.user.userType,
            token: token,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {!loading && (
        <UserContext.Provider value={[user, setUser]}>
          {props.children}
        </UserContext.Provider>
      )}
    </>
  );
};
