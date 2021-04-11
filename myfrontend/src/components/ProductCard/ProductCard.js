import React from 'react';
import {useParams} from 'react-router-dom';

const ProductCard = (props) => {
    const { id } = useParams();

    return (
        <div>Telescope Details for: {id}</div>
    )
}

export default ProductCard;
