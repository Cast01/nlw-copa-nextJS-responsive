import { OverridableTokenClientConfig, useGoogleLogin } from "@react-oauth/google";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { stringify } from "querystring";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { api } from "../lib/axios";
import Cookies from 'js-cookie'

interface AuthContextType {
    login: (overrideConfig?: OverridableTokenClientConfig | undefined) => void,
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextProviderType {
    children: ReactNode,
}

export function AuthContextProvider(props: AuthContextProviderType) {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            api.post("/user", {
                access_token: tokenResponse.access_token,
            })
                .then(data => {
                    Cookies.set("nlwcopaToken", data.data.tokenJWT, {
                        expires: 7,
                        path: "/",
                    });
                    // Set
                    // setCookie(null, 'nlwcopaToken', data.data.tokenJWT, {
                    //     maxAge: 30 * 24 * 60 * 60,
                    //     path: '/',
                    //     //httpOnly: true, // Só salava no cookie de paginas https
                    //     // O token JWT sempre será salvo com o httpOnly como true, apenas em testes que o deixamos false; 
                    // });

                    api.get("/me", {
                        headers: {
                            'Authorization': `Bearer ${data.data.tokenJWT}`
                        }
                    })
                        .then(data => {
                            Cookies.set("nlwMyProfileData", JSON.stringify(data.data.user), {
                                expires: 7,
                                path: "/"
                            })
                        })
                        .catch(err => console.log(err));

                    Router.reload();
                })
                .catch(err => alert(err));
        },
    });

    const obj = {
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