import React from 'react';

import Backdrop from './../Backdrop/Backdrop';
import Modal from './../Modal/Modal';
import Input from './../Input/Input';
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from './../Input/validators';

import { useForm } from './../../hooks/form-hooks';

import classes from './AddProduct.module.css';

const AddProduct = ({showModal, modalOFF, saveSettingsHandler}) => {
    const [formState, inputHandler] = useForm({
        producer: {
            value: 'Sky-Watcher',
            isValid: true
        },
        model: {
            value: 'Esprit-80ED Professional OTA',
            isValid: true
        },
        price: {
            value: 6700.34,
            isValid: true
        }
    }, false);
    
    const submitHandler = event => {
        event.preventDefault();

        saveSettingsHandler({
            producer: formState.inputs.producer.value,
            model: formState.inputs.model.value,
            price: formState.inputs.price.value
        });

        modalOFF();
    }

    return (
        <div>
            <Backdrop 
                show={showModal}
                clicked={modalOFF}/>
            <Modal
                show={showModal}
                modalName={'Add new telescope'}
                modalOFF={modalOFF}> 
                    <form 
                        onSubmit={submitHandler}
                        className={classes.AddProduct__Form}>
                        <Input 
                            id="producer"
                            label="Producer:"
                            type="text"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid producer name"
                            onInput={inputHandler}
                            initialValue={formState.inputs.producer.value}
                            initialValid={formState.inputs.producer.isValid}/>
                        <Input 
                            id="model"
                            label="Model:"
                            type="text"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid model name"
                            onInput={inputHandler}
                            initialValue={formState.inputs.model.value}
                            initialValid={formState.inputs.model.isValid}/>
                        <Input 
                            id="price"
                            label="Price:"
                            type="number"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(1)]}
                            errorText="Please enter a valid price (min 1)."
                            onInput={inputHandler}
                            initialValue={formState.inputs.price.value}
                            initialValid={formState.inputs.price.isValid}/>
                        <button 
                            className={classes.AddProduct__okButton}
                            type="submit" 
                            disabled={!formState.isValid}>OK</button>
                    </form>
            </Modal>
        </div>
    )
};

export default AddProduct;
