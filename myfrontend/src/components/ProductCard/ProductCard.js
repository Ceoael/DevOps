import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Property from './Property/Property';
import Button from './../Button/Button';
import ProductModal from './../ProductModal/ProductModal';

import classes from './ProductCard.module.css';

const ProductCard = ({producer, productName, deleteProductInState, editProductInState}) => {
    const [productData, setProductData ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const fetchProduct = () => {
        
        fetch(`http://localhost:9090/telescopes/${id}`)
        .then( response => response.json())
        .then( data => {
            console.log(data.message);
            setProductData(data.data[0]);
        })
        .catch((error) => {
            console.error('Error', error);
        });

    }

    const deleteProductHandler = () => {
        console.log('Delete telescope with id: ' + id);

        fetch(`http://localhost:9090/telescopes/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then( response => response.json())
        .then( data => {
            console.log('Success: ', data);

            if (!data.error) {
                deleteProductInState(id);
                history.replace('/');
            }
        })
        .catch((error) => {
        console.error('Error', error);
        });
    }

    const productDataHandler = ({producer, model, price}) => {
        editProductHandler({producer, model, price});

        editProductInState({id, producer, model, price});
        setProductData({producer, model, price});
    }

    const turnOffModal = () => {
        setShowModal(false);
    }

    const turnOnModal = () => {
        setShowModal(true);
    }

    const editProductHandler = ({producer, model, price}) => {
        fetch(`http://localhost:9090/telescopes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                producer: producer,
                model: model,
                price: price
            })
        })
        .then( response => response.json())
        .then( data => {
            if (!data.error) {
                console.log('Successufuly changed product.', data);
            }
        })
        .catch((error) => {
        console.error('Error', error);
        });
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <Fragment>
            <ProductModal 
                showModal={showModal} 
                modalOFF={turnOffModal}
                saveSettingsHandler={productDataHandler}/>
            <div className={classes.ProductCard__Wrapper}>
                <div className={classes.ProductCard}>
                    <div className={classes.ProductCard__Toolbar}>
                        <Button 
                            clicked={turnOnModal}
                            blue
                        >Edit</Button>
                        <Button 
                            clicked={deleteProductHandler}
                            red
                        >Delete</Button>
                    </div>
                    <div>
                        <div className={classes.ProductCard__Producer}>{productData.producer || 'Producer'}</div>
                        <div className={classes.ProductCard__ProductName}>{productData.model || 'Product Name'}</div>
                    </div>

                    <div>
                        <h2 className={classes.ProductCard__Specification}>Specifications:</h2>
                        <div>
                            <Property propertyName={'Price (PLN)'} propertyValue={productData.price}/>
                            <Property propertyName={'Type'} propertyValue={'Refractor'}/>
                            <Property propertyName={'Type of build'} propertyValue={'Apochromat'}/>
                            <Property propertyName={'Tube weight (kg)'} propertyValue={2.2}/>
                            <Property propertyName={'Focal length (mm)'} propertyValue={360}/>
                            <Property propertyName={'Aperture (mm)'} propertyValue={61}/>
                            <Property propertyName={'Aperture ratio (f/)'} propertyValue={5.9}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductCard;
