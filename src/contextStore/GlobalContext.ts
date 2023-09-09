import { createContext, useContext } from "react";

export interface Itheme {
    isDark: boolean,
    setDarkTheme: (_value: boolean) => void,
}
export interface Iuser {
    isSelected: boolean,
    id: number,
    name: string,
    age: string,
    subscription: string,
    employment: boolean,
}
export interface IGlobalContext {
    theme: Itheme,
    users: Iuser[],
    addUser: (_user: Iuser) => void
}

export const GlobalContext = createContext<IGlobalContext>({ 
    theme: {
        isDark: true,
        setDarkTheme: (_value: boolean) => { },
    },
    users: [
        {
            isSelected: false,
            id: Math.random()*1000000,
            name: 'Name',
            age: 'Age',
            subscription: 'Subscribed',
            employment: false,
        }
    ],
    addUser: (_user: Iuser) => {  },
});
  
export const useGlobalContext = () => useContext(GlobalContext);