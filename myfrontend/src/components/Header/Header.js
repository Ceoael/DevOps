import React from 'react';

import classes from './Header.module.css';

const Header = (props) => {
    return (
        <div className={classes.Header}>
            <h1 className={classes.Header__title}>{props.title || 'Error - missing title'}</h1>
        </div>
    )
}

export default Header;
