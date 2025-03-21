'use client'

import {IUser} from "@/models/IUser";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import AuthService from "@/services/AuthService";
import {makeAutoObservable} from "mobx";
import axios from "axios";
import {useRouter} from "next/navigation";

type UserContextType = {
    user: IUser | null,
    isAuth: boolean,
    login: (email: string, password: string) => void,
    register: (email: string, password: string) => void,
    logout: () => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<IUser | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    const router = useRouter();


    const login = async(email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            setIsAuth(true)
            setUser(response.data.user)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const register = async(email: string, password: string) => {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken)
            router.push("/")
        } catch (e) {
            console.log(e)
        }
    }

    const logout = async() => {
        const response = await AuthService.logout();
        localStorage.removeItem('token')
        setIsAuth(false)
        setUser({} as IUser)
        router.push("/")
    }

    return (
        <UserContext.Provider value={{login, register, logout, user, isAuth}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => useContext(UserContext)
