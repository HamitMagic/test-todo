import { createContext } from "react";

export interface Itheme {
    isDark: boolean,
}
export interface Iuser {
    isSelected: boolean,
    id: number,
    name: string,
    age: string,
    subscribtion: string,
    employment: boolean,
}
export interface IDefaultGlobalData {
    theme: Itheme,
    users: Iuser[],
}
export const GlobalData = { 
    theme: {
        isDark: false,
    },
    users: [
        {
            isSelected: false,
            id: Math.random()*1000000,
            name: 'Name',
            age: '34',
            subscribtion: 'Subscribed',
            employment: false,
        },
    ],
};

interface IDefaultContext {
    data: IDefaultGlobalData,
    setData: React.Dispatch<React.SetStateAction<IDefaultGlobalData>>
}
export const defaultContext = {
    data: GlobalData,
    setData: () => {},
}

export const Context = createContext<IDefaultContext>(defaultContext);