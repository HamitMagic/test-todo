import React from 'react'
import './App.css'
import Menu from './components/Menu'
import UserList from './components/UserList'
import { useGlobalContext, GlobalContext } from './contextStore/GlobalContext';

function App() {
  const {theme, users} = useGlobalContext();

  return (
    <GlobalContext.Provider value={{theme, users, addUser(){},}} >
      <div className='main-container'>
        <fieldset className='menu-container' >
          <legend>Insert Row</legend>
          <Menu />
        </fieldset>
        <UserList />
      </div>
    </GlobalContext.Provider>
  );
}

export default App
