import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import { VALIDATOR_MIN, VALIDATOR_REQUIRE } from '../Input/validators';

import { useForm } from '../../hooks/form-hooks';

import classes from './ProductModal.module.css';

const ProductModal = ({showModal, modalOFF, saveSettingsHandler}) => {
    const [formState, inputHandler] = useForm({
        producer: {
            value: 'Wiliam Optics',
            isValid: true
        },
        model: {
            value: 'ZenithStar ZS61 II OTA',
            isValid: true
        },
        price: {
            value: 3370.00,
            isValid: true
        },
        type: {
            value: 'Refractor',
            isValid: true
        },
        type_of_build: {
            value: 'Apochromatic',
            isValid: true
        },
        weight:{
            value: 2.2,
            isValid: true 
        },
        focal_length:{
            value: 360,
            isValid: true 
        },
        aperture:{
            value: 61,
            isValid: true 
        },
        aperture_ratio:{
            value: 5.9,
            isValid: true 
        }

    }, false);
    
    const submitHandler = event => {
        event.preventDefault();

        saveSettingsHandler({
            producer: formState.inputs.producer.value,
            model: formState.inputs.model.value,
            price: formState.inputs.price.value,
            type: formState.inputs.type.value,
            type_of_build: formState.inputs.type_of_build.value,
            weight: formState.inputs.weight.value,
            focal_length: formState.inputs.focal_length.value,
            aperture: formState.inputs.aperture.value,
            aperture_ratio: formState.inputs.aperture_ratio.value
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
                        className={classes.ProductModal__Form}>
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
                        <Input 
                            id="type"
                            label="Type:"
                            type="text"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid type."
                            onInput={inputHandler}
                            initialValue={formState.inputs.type.value}
                            initialValid={formState.inputs.type.isValid}/>
                        <Input 
                            id="typeOfBuild"
                            label="Type of build:"
                            type="text"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid type of build"
                            onInput={inputHandler}
                            initialValue={formState.inputs.type_of_build.value}
                            initialValid={formState.inputs.type_of_build.isValid}/>
                        <Input 
                            id="weight"
                            label="Weight:"
                            type="number"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0.1)]}
                            errorText="Please enter a valid weight (min 0.1)."
                            onInput={inputHandler}
                            initialValue={formState.inputs.weight.value}
                            initialValid={formState.inputs.weight.isValid}/>
                        <Input 
                            id="focalLength"
                            label="Focal length:"
                            type="number"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(100)]}
                            errorText="Please enter a valid focal length (min 100)."
                            onInput={inputHandler}
                            initialValue={formState.inputs.focal_length.value}
                            initialValid={formState.inputs.focal_length.isValid}/>
                        <Input 
                            id="aperture"
                            label="Aperture:"
                            type="number"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(10)]}
                            errorText="Please enter a valid aperture (min 10)."
                            onInput={inputHandler}
                            initialValue={formState.inputs.aperture.value}
                            initialValid={formState.inputs.aperture.isValid}/>
                        <Input 
                            id="apertureRatio"
                            label="Aperture ratio:"
                            type="number"
                            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(1)]}
                            errorText="Please enter a valid aperture ratio (min 1)."
                            onInput={inputHandler}
                            initialValue={formState.inputs.aperture_ratio.value}
                            initialValid={formState.inputs.aperture_ratio.isValid}/>
                        <button 
                            className={classes.ProductModal__okButton}
                            type="submit" 
                            disabled={!formState.isValid}>OK</button>
                    </form>
            </Modal>
        </div>
    )
};

export default ProductModal;
