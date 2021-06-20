import React from 'react';

import classes from './Button.module.css';

const Button = ({clicked, red, violet, blue, children}) => {

    const mergedClasses = [classes.Button];

    if (red) {
        mergedClasses.push(classes['Button--red'])
    } else if ( violet ) {
        mergedClasses.push(classes['Button--violet'])
    } else if ( blue ) {
        mergedClasses.push(classes['Button--blue'])
    }

    return ( 
        <button
            className={mergedClasses.join(' ')} 
            onClick={clicked}
        >{children}</button>
    )
}

export default Button;
