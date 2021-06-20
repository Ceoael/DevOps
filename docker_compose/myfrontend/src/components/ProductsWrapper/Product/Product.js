import React from 'react';

import classes from './Product.module.css';

const Product = (props) => {
    return (
        <div className={classes.Product}>
            <div className={classes.Product__Info}
                onClick={() => props.showDetailsHandler(props.id)}>
                <div className={classes.Product__ProducerName}>
                    { props.producer || 'Producer Name'}
                </div>
                <h2 className={classes.Product__ProductName}>
                    { props.productName || 'Product Name'}
                </h2>
            </div>
            <div className={classes.Product__Price}>
                <span className={classes.Product__BasePrice}>
                    { (props.price || '0,00') + ' zł'}
                </span>
            </div>
        </div>
    )
}

export default Product;
