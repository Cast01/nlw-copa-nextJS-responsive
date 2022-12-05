import { createContext, ReactNode } from 'react';

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