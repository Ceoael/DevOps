import React from 'react';

import classes from './Property.module.css';

const Property = ({propertyName, propertyValue}) => {

    return (
        <div className={classes.Property}>
            <p className={[classes.Property__Value, 
                classes['Property__Value--verticalLine'], 
                classes['Property__Value--bold']].join(' ')}>{propertyName}</p>
            <p className={classes.Property__Value}>{propertyValue}</p>
        </div>
    );
}

export default Property;