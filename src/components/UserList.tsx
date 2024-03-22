import React, { useContext } from 'react';
import UserItem from './UserItem';
import { Context } from '../contextStore/GlobalContext';

function UserList() {
    const { data } = useContext(Context) 
    const mode = data.theme.isLight ? '-light' : '-black';

    return (
        <React.Fragment>
        <fieldset>
            <legend>Users</legend>
            <div className={`users${mode}`}>
                <span>№</span>
                <span>Name</span>
                <span>Age</span>
                <span>Subscription</span>
                <span>Employment</span>
            </div>
            <UserItem />
        </fieldset>
        </React.Fragment>
    );
}

export default UserList;