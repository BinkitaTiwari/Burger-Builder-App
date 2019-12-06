import React from 'react';
import burgerlogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';
const logo = (props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={burgerlogo} alt="my burger" />
    </div>
);
export default logo;