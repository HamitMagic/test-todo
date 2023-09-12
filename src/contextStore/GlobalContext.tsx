import { createContext } from "react";

export interface Itheme {
    isLight: boolean,
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
    selectedUser: Iuser | null,
}

export const DefaultGlobalData = { 
    theme: {
        isLight: false,
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
    selectedUser: null,
};

interface IDefaultContext {
    data: IDefaultGlobalData,
    setData: React.Dispatch<React.SetStateAction<IDefaultGlobalData>>
}
export const defaultContext = {
    data: DefaultGlobalData,
    setData: () => {},
}

export const Context = createContext<IDefaultContext>(defaultContext);