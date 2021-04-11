import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {

    let navigationElement = (
        <button
            className={classes.NavigationItem__Button} 
            onClick={props.clicked}>{props.children}</button>);

    if ( props.navlink ) {
        navigationElement = (
            <NavLink
                to={props.to}
                exact={props.exact}
                activeClassName={props.activeClassName}
                onClick={props.clicked}>{props.children}</NavLink>);
    }

    return ( 
        <li className={classes.NavigationItem}>
            {navigationElement}
        </li>
    )
}

export default NavigationItem;
