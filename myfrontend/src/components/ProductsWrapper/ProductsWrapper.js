import React from 'react';
import { useHistory } from 'react-router-dom';

import Product from './Product/Product';

import classes from './ProductsWrapper.module.css';

const ProductsWrapper = (props) => {
    const history = useHistory();

    const showDetailsHandler = (id) => {
        history.push(`/telescope/${id}`);
    }

    return (
        <div className={classes.ProductWrapper}>
            {props.data.map((product) => (
                <Product 
                    showDetailsHandler={showDetailsHandler}
                    producer={product.producer}
                    productName={product.model}
                    price={product.price}
                    id={product.id}
                    key={product.id}/>)
            )}
        </div>
    )
}

export default ProductsWrapper;
