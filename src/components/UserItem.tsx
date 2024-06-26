import React, { useContext } from 'react';
import { Context, Iuser } from '../contextStore/GlobalContext';
import { setToLocalStore } from '../assets/functions';

function UserItem() {
    const { data, setData } = useContext(Context);
    const mode = data?.theme.isLight ? '-light' : '-black';

    function editUser(element: HTMLElement) {
        let selectedUser: Iuser | null = null;
        const users = data.users.map((user) => {
            if (user.id === +element.id) {
                user.isSelected = !user.isSelected;
                selectedUser = user.isSelected ? user : null;
            }
            else user.isSelected = false;
            return user;
        })
        setData({...data, selectedUser, users});
        setToLocalStore({...data, selectedUser, users});
    }
    function selectUser(event: React.MouseEvent) {
        editUser(event.currentTarget as HTMLDivElement);
    }

    return (
        <div className={`users-list${mode}`} >
            {data.users.map((user, count=1) => (
                <div key={user.id} onClick={selectUser} id={String(user.id)} className={user.isSelected ? `selected${mode}` : `notSelected${mode}`} >
                    <span>{++count}</span>
                    <span>{user.name}</span>
                    <span>{user.age}</span>
                    <span>{user.subscribtion}</span>
                    <span>{user.employment ? "Employed" : "Unemployed"}</span>
                </div>
            ))}
        </div>
    );
}

export default UserItem;