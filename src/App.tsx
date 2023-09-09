import React, { useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import UserList from './components/UserList'
import { Context, GlobalData } from './contextStore/GlobalContext';

function App() {
  const [data, setData] = useState(GlobalData)

  return (
    <Context.Provider value={{data, setData}} >
        <div className='main-container'>
          <fieldset className='menu-container' >
            <legend>Insert Row</legend>
            <Menu />
          </fieldset>
          <UserList />
        </div>
    </Context.Provider>
  );
}

export default App
