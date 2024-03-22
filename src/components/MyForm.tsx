import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context, Iuser,  } from '../contextStore/GlobalContext';
import { setToLocalStore } from '../assets/functions';
import { ARROWS, EVENTS } from '../assets/consts';


function MyForm() {
    const [name, setName] = useState('');
    const [userAge, setUserAge] = useState('Age',);
    const [subscribe, setSubscribe] = useState('Subscribed');
    const inputAgeRef = useRef<HTMLInputElement | null>(null);
    const employmentRef = useRef<HTMLInputElement | null>(null);
    const { data, setData } = useContext(Context);
    const [maxAge, minAge, minNameLength] = [100, 18, 3];
    const [isOpen, setIsOpen] = useState(false);
    const mode = data.theme.isLight ? '-light' : '-black';

    useEffect(() => {
        if (data.selectedUser) {
            setName(data.selectedUser.name);
            setUserAge(data.selectedUser?.age);
            setSubscribe(data.selectedUser?.subscribtion);
        } else {
            setName('');
            setUserAge('Age');
            setSubscribe('Subscribed');
        }
    }, [data]);

    function handleChange(element: HTMLInputElement) {
        const currentAge = element.value;
        return currentAge
    }

    function handleKeyboardEvent(event: React.KeyboardEvent, element: HTMLInputElement) {
        if (event.key !== ARROWS.ARROW_DOWN && event.key !== ARROWS.ARROW_UP) {
            return handleChange(element);
        }
        event.preventDefault();
        event.stopPropagation();
        let currentAge: string; 
        if (event.key === ARROWS.ARROW_DOWN) {
            currentAge = String(Math.min(Math.max(+element.value-1, minAge), maxAge))
        }else {
            currentAge = String(Math.min(Math.max(+element.value+1, minAge), maxAge));
        }
        return Number.isNaN(+currentAge) ? String(minAge) : currentAge;
    }
    
    function handleClickEvent(event: React.MouseEvent, element: HTMLInputElement, num: number) {
        event.preventDefault();
        event.stopPropagation();
        let currentAge = element.value;
        if (Number.isNaN(+currentAge)) return String(minAge);
        currentAge = String(Number(element.value) + num);
        return String(Math.min(Math.max(+currentAge, minAge), maxAge));
    }

    function validateAge(event: React.KeyboardEvent | React.ChangeEvent<HTMLInputElement> | React.MouseEvent, num: number = 0) {
        const element = inputAgeRef.current as HTMLInputElement;

        if (event.type === EVENTS.MOUSE_CLICK && checkButtonPressed(num)) {
            setUserAge(handleClickEvent(event as React.MouseEvent, element, num))
        } else if (event.type === EVENTS.KEYBOARD_KEYDOWN || event.type === EVENTS.INPUT_CHANGE) {
            setUserAge(handleKeyboardEvent(event as React.KeyboardEvent, element));
        } else setUserAge(element.value);
    }

    function checkButtonPressed(num: number) {
        if (num !== 0) return true;
        return false;
    }

    function decrementAge(event: React.MouseEvent) {
        validateAge(event, -1);
    }

    function incrementAge(event: React.MouseEvent) {
        validateAge(event, 1);
    }
    
    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        const element = employmentRef.current as HTMLInputElement;
        const newData = structuredClone(data);
        const newUser: Iuser = {
            isSelected: false,
            id: Math.random() * 100000000,
            name: name,
            age: Number.isNaN(+userAge) ? String(minAge) : userAge,
            subscribtion: subscribe,
            employment: element.checked,
        };

        if (data.selectedUser) {
            newData.users = newData.users.map(user => {
                if (user.id === data.selectedUser?.id) return newUser
                return user;
            })
        }
        else newData.users.push(newUser);
        newData.selectedUser = null;
        
        
        if (name.length < minNameLength || Number.isNaN(Number(userAge)) || Number(userAge) < minAge || Number(userAge) > maxAge) {
            alert("вы не прошли проверку безопастности");
            return null;
        }
        setName('');
        setUserAge('Age');
        setSubscribe('Subscribed');
        setData(newData)
        setToLocalStore(newData);
    }

    function ValidateName(event: React.ChangeEvent<HTMLInputElement>) {
        const element = event.target;
        if (element.value.length < minNameLength) {
            element.style.borderColor =  'red';
        } else element.style.borderColor = 'black';
        setName(element.value)
    }

    function selectSubscribe(value: string) {
        setIsOpen(false);
        setSubscribe(value);
    }
    return (
        <form name='form' className={`form${mode}`} onSubmit={handleFormSubmit}>
            <input className={`input${mode}`} onChange={ValidateName} type='text' value={name} placeholder='Name'/>
            <div className={`age-wrapper`}>
                <input ref={inputAgeRef} className={`input${mode}`} onChange={validateAge} onKeyDown={validateAge} type='text' value={userAge} />
                <span id={`decrease-age${mode}`} onClick={decrementAge} > {'>'} </span>
                <span id={`increase-age${mode}`} onClick={incrementAge} > {'<'} </span>
            </div>
            <div role="combobox" aria-haspopup="listbox" aria-expanded="false" className={`input-wrapper`}>
                <input
                    className={`input${mode}`}
                    onChange={(event) => setSubscribe(event.target.value)}
                    aria-activedescendant=''
                    value={subscribe}
                    aria-autocomplete="list"
                    type='text' 
                />
                <span onClick={() => setIsOpen(!isOpen)} id={`show-options${mode}`}>{ isOpen ? '<' : '>'}</span>
                {isOpen && <div className='options-wrapper'>
                    <span onClick={() => selectSubscribe('Subscribed')} >Subscribed</span>    
                    <span onClick={() => selectSubscribe('Not Subscribed')} >Not Subscribed</span>    
                    <span onClick={() => selectSubscribe('Other')}>Other</span>    
                </div>}
            </div>
            <label  className={`custom-checkbox`}>
                <input ref={employmentRef} name='form' id={`employed${mode}`} type='checkbox' />
                <span>Employed</span>
            </label>
            <button className={`button${mode}`} type='submit'>{data.selectedUser ? `Modify` : `Insert`}</button>
        </form>
    );
}

export default MyForm;