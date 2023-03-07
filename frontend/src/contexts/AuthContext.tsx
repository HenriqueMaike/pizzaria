import { createContext, ReactNode, useState, useEffect } from "react";

import {destroyCookie, setCookie, parseCookies} from 'nookies';
import Router from 'next/router'
import { api } from "../services/apiClient";

import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('erro ao deslogar')
    }
}


export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;



    useEffect(()=>{

        const {'@nextauth.token': token} = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const {id, name, email} = response.data;

                setUser({
                    id, 
                    name, 
                    email
                })
            })
            .catch(()=>{
                signOut();
            })
        }

    }, [])

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session', {
                email, 
                password
            })
            
            
            const {id, name, token} = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, 
                path: "/"
            })

            setUser({
                id, 
                name, 
                email,
            })

            //passar para proximas requisicoes o token

            api.defaults.headers['Authorization'] = `Beares ${token}`



            toast.success('logado com sucesso!', {
                theme: "dark"
              })

            //Redirecionar o user para o dashboard

            Router.push('/dashboard')

        }catch(err){
            toast.error('Erro ao acessar!', err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/user', {
                name, 
                email, 
                password
            })
            toast.success('Conta criada com sucesso!', {
                theme: "dark"
              })
            Router.push('/');
        }catch(err){
            toast.error(`Erro ao criar conta ${err}`, {
                theme: "dark"
              })
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}