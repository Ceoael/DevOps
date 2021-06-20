import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Property from './Property/Property';
import Button from './../Button/Button';
import ProductModal from './../ProductModal/ProductModal';

import classes from './ProductCard.module.css';

const ProductCard = ({deleteProductInState, editProductInState}) => {
    const [productData, setProductData ] = useState({});
    const [ showModal, setShowModal ] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const fetchProduct = () => {
        
        fetch(`/api/telescopes/${id}`)
        .then( response => response.json())
        .then( data => {
            console.log(data.data);
            console.log(data.message);
            setProductData(data.data[0]);
        })
        .catch((error) => {
            console.error('Error', error);
        });

    }

    const deleteProductHandler = () => {
        console.log('Delete telescope with id: ' + id);

        fetch(`/api/telescopes/${id}`, {
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

    const productDataHandler = ({producer, model, price,type,type_of_build,weight,focal_length,aperture,aperture_ratio}) => {
        editProductHandler({producer, model, price,type,type_of_build,weight,focal_length,aperture,aperture_ratio});

        editProductInState({id, producer, model, price,type,type_of_build,weight,focal_length,aperture,aperture_ratio});
        setProductData({producer, model, price,type,type_of_build,weight,focal_length,aperture,aperture_ratio});
    }

    const turnOffModal = () => {
        setShowModal(false);
    }

    const turnOnModal = () => {
        setShowModal(true);
    }

    const editProductHandler = ({producer, model, price,type,type_of_build,weight,focal_length,aperture,aperture_ratio}) => {
        fetch(`/api/telescopes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                producer,
                model,
                price,
                type,
                type_of_build,
                weight,
                focal_length,
                aperture,
                aperture_ratio
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
            { productData ? 
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
                        <div className={classes.ProductCard__Producer}>{productData.producer}</div>
                        <div className={classes.ProductCard__ProductName}>{productData.model}</div>
                    </div>

                    <div>
                        <h2 className={classes.ProductCard__Specification}>Specifications:</h2>
                        <div>
                            <Property propertyName={'Price (PLN)'} propertyValue={productData.price}/>
                            <Property propertyName={'Type'} propertyValue={productData.type}/>
                            <Property propertyName={'Type of build'} propertyValue={productData.type_of_build}/>
                            <Property propertyName={'Tube weight (kg)'} propertyValue={productData.weight}/>
                            <Property propertyName={'Focal length (mm)'} propertyValue={productData.focal_length}/>
                            <Property propertyName={'Aperture (mm)'} propertyValue={productData.aperture}/>
                            <Property propertyName={'Aperture ratio (f/)'} propertyValue={productData.aperture_ratio}/>
                        </div>
                    </div>
                </div>
            </div>
            : 
            <div className={classes.ProductCard__NoData}>
                <p>No data in DB for product with provided id.</p>
            </div>}
        </Fragment>
    )
}

export default ProductCard;
