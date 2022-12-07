import { useGoogleLogin } from '@react-oauth/google';
import { AxiosResponse } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface AuthContextProviderPropsType {
    children: ReactNode;
}

interface UserProps {
    name: string,
    avatarUrl: string,
}

export interface AuthContextType {
    user: UserProps,
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({children}: AuthContextProviderPropsType) {
    const [user, setUser] = useState<AxiosResponse<any, any>>();
    const [accessToke, setAccessToken] = useState();

    return (
        <AuthContext.Provider value={{
            user: {
                name: '',
                avatarUrl:  '',
            },
        }}>
            {children}
        </AuthContext.Provider>
    );
}