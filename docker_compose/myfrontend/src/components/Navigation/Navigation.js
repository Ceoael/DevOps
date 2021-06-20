import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './Navigation.module.css';

const Navigation = (props) => {
    return (
        <div className={classes.Navigation__Wrapper}>
            <ul className={classes.Navigation}>
                <NavigationItem 
                    navlink
                    clicked={() => { console.log('[Navigation] Show all telescopes')}}
                    to='/'
                    exact>All</NavigationItem>
                {/* <NavigationItem 
                    clicked={props.openModalHandler}
                    to='/'
                    exact>Add</NavigationItem> */}
                <NavigationItem clicked={props.openModalHandler}>+</NavigationItem>
            </ul>
        </div>
    )
}

export default Navigation;
