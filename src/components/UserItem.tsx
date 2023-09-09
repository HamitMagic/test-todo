import React, { useEffect } from 'react';
import { Iuser, useGlobalContext } from '../contextStore/GlobalContext';

function UserItem() {
    const {users} = useGlobalContext();

    useEffect(() => {

    }, [users])

    function selectUser(event: React.MouseEvent, currentUser: Iuser) {
        console.log(currentUser.isSelected);
        event.preventDefault();
        event.stopPropagation();

        users.map(user => {
            if (user.id === currentUser.id) {
                user.isSelected = true;
            } else user.isSelected = false;

            return user
        });
        
        console.log(currentUser.isSelected)
    }

    return (
        <>
            {users.map(user => (
                <div key={user.id} className={user.isSelected ? 'selected' : 'notSelected'} onClick={(e) => selectUser(e, user)}>
                    <span>{user.name}</span>
                    <span>{user.age}</span>
                    <span>{user.subscription}</span>
                    <span>{user.employment}</span>
                </div>
            ))}
        </>
    );
}

export default UserItem;