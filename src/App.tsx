import React, { useState } from 'react'
import './App.css'
import LeftPanel from './components/LeftPanel'
import UserList from './components/UserList'
import { Context, IDefaultGlobalData } from './contextStore/GlobalContext';


function getData() {
  try {
      const localData: string | null = localStorage.getItem('localData');
      const data: IDefaultGlobalData = JSON.parse(localData);
      if (data) return data as IDefaultGlobalData;
      else return null;
  } catch (error) {
      console.log('ошибка получения данных и базы')
  }
}

function App() {
  const [data, setData] = useState(() => {
    return getData() || {
      theme: {
        isLight: false,
      },
      users: [
        {
          isSelected: true,
          id: Math.random()*1000000,
          name: 'Mr. Anderson',
          age: '55',
          subscribtion: 'Subscribed',
          employment: true,
        },
      ],
    }
  });
  
  const mode = data.theme.isLight ? '-light' : '-black';
  const color = data.theme.isLight ? '#ccc' : '#333';
  return (
    <Context.Provider value={{data, setData}} >
        <div className={`main-container${mode}`} style={{backgroundColor: color}} >
          <fieldset className={`fieldset${mode}`} >
            <legend>Insert Row</legend>
            <LeftPanel />
          </fieldset>
          <UserList />
        </div>
    </Context.Provider>
  );
}

export default App
