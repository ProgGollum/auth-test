"use client"

import React, {ReactNode, useContext} from 'react';
import Store from "@/store/store";
import {createContext} from "react";

export const StoreContext = createContext(Store)

export const StoreWrapper = ({children}: {children: ReactNode}) => {
    return (
        <StoreContext.Provider value={Store}>{children}</StoreContext.Provider>
    )
}

export const useStores = () => {
    return useContext(StoreContext)
}
