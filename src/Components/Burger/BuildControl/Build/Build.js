import React from 'react';
import classes from './Build.css';
const build =(props) =>(

	<div className={classes.Build}>

		<div className={classes.Label}>{props.label}</div>
		<button className={classes.Less} onClick={props.remove} disabled={props.disabled}>Less</button>
		<button className={classes.More} onClick={props.added}>More</button>

	</div>

	);

export default build;