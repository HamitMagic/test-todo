import React, { useContext, useRef, useState } from 'react';
import { Context, Iuser,  } from '../contextStore/GlobalContext';

function MyForm() {
    const [name, setName] = useState('');
    const [userAge, setUserAge] = useState('Age',);
    const [subscribe, setSubscribe] = useState('Subscribed');
    const inputAgeRef = useRef<HTMLInputElement | null>(null);
    const { data, setData } = useContext(Context);
    const employmentRef = useRef<HTMLInputElement | null>(null);
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

    function paintBorder(element: HTMLElement, valid: boolean) {
        valid ? element.style.borderColor = 'black' : element.style.borderColor = 'red';
    }

    function validateAge(event: React.KeyboardEvent | React.ChangeEvent<HTMLInputElement> | React.MouseEvent, num: number = 0) {
        const prevAge = userAge;
        const element = inputAgeRef.current as HTMLInputElement;
        let currentAge = element.value;
        if (checkButtonPressed(num) || (event.type === 'keydown' && (event.key === 'ArrowDown' || event.key === 'ArrowUp'))) {
            event.preventDefault()

            if ((num > 0 && +prevAge === 100) || (+prevAge === 18 && num < 0)) return null; //отключаем кнопки если достигли минмум и максимум
            if ((event.key === 'ArrowUp' && +prevAge === 100) || (+prevAge === 18 && event.key === 'ArrowDown')) return null; //отключаем клавиши вверх и вниз если достигли минмум и максимум
            
            if (Number.isNaN(Number(currentAge)) || Number(currentAge) < 18 || Number(prevAge) < 18) {
                currentAge = '18';
                paintBorder(element, true);
            } else if (Number(currentAge) > 100 || Number(prevAge) > 100) {
                currentAge = '100';
                paintBorder(element, true);
            } else {

                if (checkButtonPressed(num)) currentAge = String(+prevAge + num)
                else {
                    if (Number(currentAge) < 18 || Number(prevAge) < 18) currentAge = '18';
                    else if (Number(currentAge) > 100 || Number(prevAge) > 100) currentAge = '100';
                    else currentAge = event.key === 'ArrowUp' ? String(+currentAge+1) : String(+currentAge-1)
                }
            }
        } 
        setUserAge(currentAge);
        if (Number.isNaN(Number(currentAge)) || Number(currentAge) < 18 || Number(currentAge) > 100) paintBorder(element, false);
        else paintBorder(element, true);
    }

    function checkButtonPressed(num: number) {
        if (num) return true;
        return false;
    }

    function decrementAge(event: React.MouseEvent) {
        validateAge(event, -1);
    }

    function incrementAge(event: React.MouseEvent) {
        validateAge(event, 1);
    }
    
    function handlerFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        const element = employmentRef.current as HTMLInputElement;
        const newData = structuredClone(data);
        const newUser: Iuser = {
            isSelected: false,
            id: Math.random() * 100000000,
            name,
            age: Number.isNaN(+userAge) ? '18' : userAge,
            subscribtion: subscribe,
            employment: element.checked,
        };
        newData.users.push(newUser);
        setData(newData)
    }

    function ValidateName(event: React.ChangeEvent<HTMLInputElement>) {
        const element = event.target
        if (element.value.length < 3) {
            element.style.borderColor =  'red'
        } else element.style.borderColor = 'black'
        setName(element.value)
        
    }

    // function handleOptionSelect(option: string) {
    //     if (onOptionSelect) {
    //       onOptionSelect(option);
    //     } else {       box-shadow: inset 0 1px 1px rgba(50, 200, 150, 0.75), 0 0 8px rgba(98, 209, 98, 0.6);
    //       onChange(option);
    //     }
    // }

    return (
        <form name='form' onSubmit={handlerFormSubmit}>
            <input className='input' onChange={ValidateName} type='text' value={name} placeholder='Name'/>
            <div className='age-wrapper'>
                <input ref={inputAgeRef} className='input' onChange={validateAge} onKeyDown={validateAge} type='text' value={userAge} />
                <span id='decrease-age' onClick={decrementAge} > {'>'} </span>
                <span id='increase-age' onClick={incrementAge} > {'<'} </span>
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
            <label  className='custom-checkbox'>
                <input ref={employmentRef} name='form' id='employed' type='checkbox'/>
                <span>Employed</span>
            </label>
            <button type='submit'>Insert</button>
        </form>
    );
}

export default MyForm;