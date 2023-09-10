import React, {useContext, useRef} from 'react';
import MyForm from './MyForm';
import { Context } from '../contextStore/GlobalContext';
import { setToLocalStore } from '../assets/functions';

function LeftPanel() {
   const {data, setData} = useContext(Context)
   const checkBoxRef = useRef<HTMLInputElement | null>(null);
   const mode = data.theme.isLight ? '-light' : '-black';

    function changeMode(event: React.MouseEvent) {
        event.stopPropagation();
        const newData = structuredClone(data);
        if (checkBoxRef.current?.checked) newData.theme.isLight = false;
        else newData.theme.isLight = true;
        setData(newData);
        setToLocalStore(newData);
    }

    function deleteUser() {
        const newUsers = data.users.filter(user => user.isSelected === false);
        setData({...data, users: newUsers});
        setToLocalStore({...data, users: newUsers});
    }

    return (
        <div>
            <MyForm />
            <div>
                <hr />
            </div>
            <label onClick={changeMode} className={`toggle-checkbox${mode}`} >
                <input ref={checkBoxRef} type={'checkbox'} defaultChecked={data.theme.isLight} />
                <span className={`slider${mode}`}></span>
                <span>Mode</span>
            </label>
            <button onClick={deleteUser}>Delete</button>
        </div>
    );
}

export default LeftPanel;