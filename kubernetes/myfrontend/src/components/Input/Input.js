import React, {useReducer, useEffect} from 'react';

import {validate} from './validators';

import classes from './Input.module.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    };
};

const Input = props => { 
    const [inputState, dispatch] = useReducer ( inputReducer, {
        value: props.initialValue || '',
        isValid: props.initialValid || false,
        isTouched: false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
        console.log(`isValid: ${isValid}`)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE', 
            val: event.target.value, 
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element = props.element === 'textarea' ? (
        <textarea
            className={classes.Input__textarea}
            id={props.id}
            rows={props.rows || 2} 
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        /> 
        ) : (
        <input
            className={classes.Input__input}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value} />
        );


    return (
        <div 
            className={`${classes.Input} 
                ${!inputState.isValid && 
                inputState.isTouched &&
                classes['Input--invalid']}`}
            >
            <label 
                className={classes.Input__label}
                htmlFor={props.id}>{props.label}
            </label>
            {element}
            {!inputState.isValid && 
            inputState.isTouched && 
            <p
                className={classes.Input__error}>{props.errorText}</p>}
        </div>
    )
}

export default Input;