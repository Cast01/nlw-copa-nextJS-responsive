import { OverridableTokenClientConfig, useGoogleLogin } from "@react-oauth/google";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { stringify } from "querystring";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { api } from "../lib/axios";

interface AuthContextType {
    tokenJWT: string,
    setTokenJWT: Dispatch<SetStateAction<string>>,
    user: any,
    setUser: Dispatch<SetStateAction<any>>,
    login: (overrideConfig?: OverridableTokenClientConfig | undefined) => void,
}

export const AuthContext = createContext({} as AuthContextType);

interface UserType {
    avatarUrl: string,
    name: string,
    sub: string,
}

interface AuthContextProviderType {
    children: ReactNode,
}

export function AuthContextProvider(props: AuthContextProviderType) {
    const [tokenJWT, setTokenJWT] = useState("");
    const [user, setUser] = useState(); 

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            api.post("/user", {
                access_token: tokenResponse.access_token,
            })
            .then(data => {
                // Set
                setCookie(null, 'nlwcopaToken', data.data.tokenJWT, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                    //httpOnly: true, // Só salava no cookie de paginas https
                    // O token JWT sempre será salvo com o httpOnly como true, apenas em testes que o deixamos false; 
                });
                const {nlwcopaToken} = parseCookies();
                setTokenJWT(nlwcopaToken);

                api.get("/me", {
                    headers: {
                        'Authorization': `Bearer ${data.data.tokenJWT}`
                    }
                })
                .then(data => {
                    setCookie(null, 'nlwMyProfileData', data.data.user, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/',
                    });
                    //const {nlwMyProfileData} = parseCookies();
                    //setUser(nlwMyProfileData);
                    console.log(data.data.user);
                })
                .catch(err => console.log(err));

                Router.push("/");
            })
            .catch(err => alert(err));
        },
    });

    const obj = {
        tokenJWT,
        setTokenJWT,
        user,
        setUser,
        login,
    }

    return (
        <AuthContext.Provider value={obj}>
            {props.children}
        </AuthContext.Provider>
    );
}

/*
    // NOOKIES



    // CLIENT


    // Simply omit context parameter.
    // Parse
    const cookies = parseCookies()
    console.log({ cookies })

    // Set
    setCookie(null, 'fromClient', 'value', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })

    // Destroy
    // destroyCookie(null, 'cookieName')
*/

/*
    // SERVER


    // Context parameter.
    // Parse
    const cookies = parseCookies(ctx)
    console.log({ cookies })

    // Set
    setCookie(ctx, 'fromClient', 'value', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    })

    // Destroy
    // destroyCookie(ctx, 'cookieName')
*/