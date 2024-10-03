import React, { createContext, useState } from "react";

interface UserInfoInterface {
    email?: string,
    name?: string,
    isAdmin?: boolean,
    isVerified?: boolean
}

interface UserContextInterface {
    userInfo: UserInfoInterface,
    setUserInfo: (userInfo: UserInfoInterface) => void
}

export const UserContext = createContext<UserContextInterface>({
    userInfo: {},
    setUserInfo: () => { }
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfoInterface>({});

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
}
