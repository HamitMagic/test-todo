import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../contextStore/GlobalContext';

function UserItem() {
    const { data, setData } = useContext(Context);

    function selectUser(event: React.MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        function editUser(element: HTMLElement) {
            element.className = 'selected';
            const newUsers = data.users.map(user => {
                if (user.id === +element.id) user.isSelected = true;
                else user.isSelected = false;
                return user;
            })
            data.users = newUsers;
            setData(data);
        }

        for (const node of event.currentTarget.childNodes) {
            let element = node as HTMLDivElement
            if (node === event.target) {
                editUser(element)
                break;
            } else element.className = 'notSelected';

            for (const spanElement of node.childNodes) {
                element = spanElement.parentElement as HTMLDivElement
                if (spanElement === event.target) {
                    editUser(element)
                    break;
                } else element.className = 'notSelected'
            }
        }
    }

    return (
        <div className="users-list" onClick={selectUser}>
            {data.users.map((user, count=1) => (
                <div key={user.id} id={String(user.id)} className={user.isSelected? 'selected' : 'notSelected'} >
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