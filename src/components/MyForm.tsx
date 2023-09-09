import React, { MouseEvent, ReactNode, useRef, useState } from 'react';
import { Iuser, useGlobalContext } from '../contextStore/GlobalContext';

function MyForm() {
    const [name, setName] = useState('');
    const [userAge, setUserAge] = useState('Age',);
    const [subscribe, setSubscribe] = useState('Subscribed');
    // const inputRef = useRef<HTMLDivElement | null>(null);
    const {users, addUser} = useGlobalContext();
    const [employment, setEmployment] = useState(false)
    const options = ['Subscribed', 'Not Subscribed', 'Other'];

    // interface InputProps {
    //     leftIcon?: IconName;
    //     leftIconTooltip?: ReactNode;
    //     rightIcon?: IconName;
    //     rightIconTooltip?: ReactNode;
    //     colorScheme?: InputColorScheme;
    //     onLeftIconClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    //     onRightIconClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    // }

    function checkAge(event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent) {
        console.log(event, 1111111111)
        const element = event.target;
        const age = element.value;
        // event.preventDefault();
        // event.stopPropagation();
        if (Number.isNaN(Number(age)) || Number(age) < 18 || Number(age) > 100) {
            element.style.borderColor = 'red';
        } else {
            element.style.borderColor = 'black';
            
        }
        setUserAge(age);
    }

    function decrementAge(event: React.MouseEvent) {
        checkAge(event)
        // event.preventDefault();
        // event.stopPropagation();
        setUserAge(String(
            Math.min(
                Math.max(18, Number(userAge) - 1),
                100
            )
        ))
    }

    function incrementAge(event: React.MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        setUserAge(String(
            Math.max(
                Math.min(100, Number(userAge) + 1),
                18
            )
        ))
    }
    
    function handlerFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        // console.log(users);
        const newUser: Iuser = {
                    isSelected: false,
                    id: Math.random() * 100000000,
                    name,
                    age: userAge,
                    subscription: subscribe,
                    employment: employment,
                };
        addUser(newUser as Iuser)
    }

    // function handleOptionSelect(option: string) {
    //     if (onOptionSelect) {
    //       onOptionSelect(option);
    //     } else {
    //       onChange(option);
    //     }
    // }

    return (
        <form name='form' onSubmit={handlerFormSubmit}>
            <input className='input' onChange={event => setName(event.target.value)} type='text' value={name} placeholder='Name'/>
            <div className='age-wrapper'>
                <input className='input' onChange={checkAge} type='text' value={userAge} />
                <span id='decrease-age'>{'>'}</span>
                <span id='increase-age'>{'<'}</span>
            </div>
            <div role="combobox" aria-haspopup="listbox" aria-expanded="false" className="input-wrapper">
                <input
                    className='input'
                    onChange={(event) => setSubscribe(event.target.value)}
                    aria-activedescendant=''
                    value={subscribe}
                    aria-autocomplete="list"
                    type='text' 
                />
                <span id='show-options'>{'>'}</span>
            </div>
            <label onClick={() => setEmployment(!employment)} className='custom-checkbox'>
                <input name='form' id='employed' type='checkbox'/>
                <span>Employed</span>
            </label>
            <button type='submit'>Insert</button>
        </form>
    );
}

export default MyForm;