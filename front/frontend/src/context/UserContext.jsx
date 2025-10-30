import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userChoice, setUserChoice] = useState(null); // { profile, country }
    const [playlist, setPlaylist] = useState([]); // liste d’attractions ajoutées

    const endTrip = () => {
        setUserChoice(null);
        setPlaylist([]);
    };

    return (
        <UserContext.Provider value={{ userChoice, setUserChoice, playlist, setPlaylist, endTrip }}>
            {children}
        </UserContext.Provider>
    );
};
