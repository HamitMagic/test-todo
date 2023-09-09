import React, {useContext} from 'react';
import MyForm from './MyForm';
import { Context } from '../contextStore/GlobalContext';

function Menu() {
   const {data, setData} = useContext(Context)

    function changeMode() {
        const newData = structuredClone(data);
        newData.theme.isDark = !data.theme.isDark;
        setData(newData);
    }

    function deleteUser() {
        console.log(data.users)
        const newData = structuredClone(data);
        console.log(newData.users)
        const newUsers = data.users.filter(user => user.isSelected === false);
        setData({...data, users: newUsers});
    }

    return (
        <div>
            <MyForm />
            <div>
                <hr />
            </div>
            <label onClick={changeMode} className='toggle-checkbox' >
                <input type='checkbox' />
                <span className='slider round'>Mode</span>
            </label>
            <button onClick={deleteUser}>Delete</button>
        </div>
    );
}

export default Menu;