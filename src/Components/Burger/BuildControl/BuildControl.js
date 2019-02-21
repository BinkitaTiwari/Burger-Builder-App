import React from 'react';
import classes from './BuildControl.css';
import Build from './Build/Build.js';
const control =[

	{label:'Salad', type:'salad'},
	{label:'Cheese', type:'cheese'},
	{label:'Meat', type:'meat'},
	{label:'Bacon', type:'bacon'}

]

const buildControl=(props)=>(

	<div className={classes.BuildControl}>
	<p><strong>Current Price:{props.price.toFixed(2)}</strong></p>
		{control.map(ctrl =>(

			<Build 
			key={ctrl.label} 
			label={ctrl.label}
			added={()=> props.addIngredient(ctrl.type)}
			remove={()=> props.removeIngredient(ctrl.type)} 
			disabled={props.disable[ctrl.type]} />
			)



			)}
	
		<button className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.ordered}>ORDER NOW</button>
				

	</div>

	);

export default buildControl;