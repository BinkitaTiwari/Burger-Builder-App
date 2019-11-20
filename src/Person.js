import React from 'react';
const person = (props)=> {
    return (
        <div>
            <p onClick={props.click}>my name is {props.name} and i 'm {props.age} years old</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.name}/>

        </div>
    
    )}

export default person;
