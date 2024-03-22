import React, { useState } from 'react'
import './App.css'
import LeftPanel from './components/LeftPanel'
import UserList from './components/UserList'
import { Context, IDefaultGlobalData } from './contextStore/GlobalContext';


function getData() {
  try {
      const localData: string | null = localStorage.getItem('localData');
      const data: IDefaultGlobalData = localData ? JSON.parse(localData) : null;
      if (data) return data as IDefaultGlobalData;
      else return null;
  } catch (error) {
      console.log('ошибка получения данных и базы')
  }
}

export default function App() {
  const [data, setData] = useState(() => {
    return getData() || {
      theme: {
        isLight: false,
      },
      users: [
        {
          isSelected: false,
          id: Math.random()*1000000,
          name: 'Mr. Anderson',
          age: '55',
          subscribtion: 'Subscribed',
          employment: true,
        },
      ],
    } as IDefaultGlobalData
  });
  
  const mode = data.theme.isLight ? '-light' : '-black';
  const color = data.theme.isLight ? '#ccc' : '#333';
  return (
    <React.Fragment>
      <Context.Provider value={{data, setData}} >
          <div className={`main-container${mode}`} style={{backgroundColor: color}} >
            <fieldset className={`fieldset${mode}`} >
              <legend>Insert Row</legend>
              <LeftPanel />
            </fieldset>
            <UserList />
          </div>
      </Context.Provider>
    </React.Fragment>
  )
}
