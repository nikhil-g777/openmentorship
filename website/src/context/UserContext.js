import React, { useEffect, useState, createContext } from 'react';

import { getUserInfo } from '../api';

export const UserContext = createContext();

export const UserProvider = (props) => {
    
    const [user, setUser] = useState({
        _id: '',
        registrationComplete: '',
        role: '',
        userType: ''
    });

    useEffect(() => {

        const token = localStorage.getItem('token');
        if(token) {
          getUserInfo({})
            .then((response) => {
              setUser({
                _id: response.data.user._id,
                registrationComplete: response.data.user.registrationComplete,
                role: response.data.user.role,
                userType: response.data.user.userType
              });
            })
            .catch((err) => {
              console.log(err);
            })
        }
    
      }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
};