import React from 'react';
import MyForm from './MyForm';
import { useGlobalContext } from '../contextStore/GlobalContext';

function Menu() {
    const {theme} = useGlobalContext();
    
    function deleteUser(event: React.MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
   
    return (
        <div>
            <MyForm />
            <div>
                <hr />
            </div>
            <label onClick={() => theme.setDarkTheme(!theme.isDark)} className='toggle-checkbox' >
                <input type='checkbox' />
                <span className='slider round'>Mode</span>
            </label>
            <button onClick={deleteUser}>Delete</button>
        </div>
    );
}

export default Menu;