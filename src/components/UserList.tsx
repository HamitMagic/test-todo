import React from 'react';
import UserItem from './UserItem';

function UserList() {

    return (
        <fieldset>
            <legend>Users</legend>
            <div className='users'>
                <span>Name</span>
                <span>Age</span>
                <span>Subscription</span>
                <span>Employment</span>
            </div>
            <UserItem />
        </fieldset>
    );
}

export default UserList;