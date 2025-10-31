import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userChoice, setUserChoice] = useState(null);
    const [playlist, setPlaylist] = useState([]);

    const setUser = (choice) => {
        setUserChoice(choice);
    };

    const endTrip = () => {
        setUserChoice(null);
        setPlaylist([]);
    };

    const addToList = (item) => {
        setPlaylist((prev) => {
            const exists = prev.find((p) => p.location_id === item.location_id);
            if (exists) return prev;
            return [...prev, item];
        });
    };

    const removeFromList = (location_id) => {
        setPlaylist((prev) => prev.filter((p) => p.location_id !== location_id));
    };

    return (
        <UserContext.Provider
            value={{
                userChoice,
                setUser,
                endTrip,
                playlist,
                addToList,
                removeFromList,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
