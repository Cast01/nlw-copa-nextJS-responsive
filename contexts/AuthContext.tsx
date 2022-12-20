import { OverridableTokenClientConfig, useGoogleLogin } from "@react-oauth/google";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface UserType {
    name: string,
    avatarUrl: string,
    sub: string,
}

interface AuthContextType {
    login: (overrideConfig?: OverridableTokenClientConfig | undefined) => void,
    user: UserType | undefined,
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextProviderType {
    children: ReactNode,
}

export function AuthContextProvider(props: AuthContextProviderType) {
    const [ user, setUser ] = useState<UserType>();

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

                api.get("/me", {
                    headers: {
                        'Authorization': `Bearer ${data.data.tokenJWT}`
                    }
                })
                    .then(data => {
                        setCookie(null, 'nlwcopaUser', JSON.stringify(data.data.user), {
                            maxAge: 30 * 24 * 60 * 60,
                            path: '/',
                            //httpOnly: true, // Só salava no cookie de paginas https
                            // O token JWT sempre será salvo com o httpOnly como true, apenas em testes que o deixamos false; 
                        });
                        setUser(data.data.user);
                    })
                    .catch(err => console.log(err));

                Router.reload();
            })
            .catch(err => alert(err));
        },
    });

    useEffect(() => {
        const {nlwcopaUser} = parseCookies();

        if (nlwcopaUser) {
            const parse = JSON.parse(nlwcopaUser);
            setUser(parse)
        }

    }, []);

    const obj = {
        login,
        user,
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