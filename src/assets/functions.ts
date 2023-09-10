import { IDefaultGlobalData } from "../contextStore/GlobalContext";

export function setToLocalStore(data: IDefaultGlobalData) {
    try {
        const localData = JSON.stringify(data);
        localStorage.setItem('localData', localData)
    } catch (error) {
        console.log("ошибка загрузки данный в стор")
    }
}