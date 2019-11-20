import React, {Component} from 'react';
import Aux from '../../hoc/Auxi';
import Burger from '../../Components/Burger/Burger';
import BuildControl from '../../Components/Burger/BuildControl/BuildControl';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

const INGRIDIENTS_PRICE={

salad:0.4,
meat:1.2,
cheese:0.5,
bacon:2.0

}

class BurgerBuilder extends Component
{
	state={
			ingredients:{

				salad:0,
				bacon:0,
				cheese:0,
				meat:0


			},
			
			totalPrice:4,
			purchasable:false

	}

	updatePurchaseState(ingredients)
	{
		//const ingredients={...this.state.ingredients};
		const sum=Object.keys(ingredients).map(igKey=>{
			return ingredients[igKey];
		}).reduce((sum,el)=>{
			return sum+el;
		},0);
		
		this.setState({purchasable:sum>0},()=>{console.log(this.state.purchasable)});
	}

	addIngredientHandler=(type)=>{
		console.log(type);
		const oldCount=this.state.ingredients[type];
		const updateCount=oldCount+1;
		const updateIngredients={...this.state.ingredients};
		updateIngredients[type]=updateCount;

		const priceAddition=INGRIDIENTS_PRICE[type];
		const oldPrice=this.state.totalPrice;
		const newPrice=oldPrice+priceAddition;
		this.setState({totalPrice:newPrice,ingredients:updateIngredients});
		this.updatePurchaseState(updateIngredients);

	}

	removeIngredientHandler =(type)=>{
		console.log(type);
		const oldCount=this.state.ingredients[type];
		if(oldCount<=0){
			return;
		}
		const updateCount=oldCount-1;
		const updateIngredients={...this.state.ingredients};
		updateIngredients[type]=updateCount;

		const priceDeduction=INGRIDIENTS_PRICE[type];
		const oldPrice=this.state.totalPrice;
		const newPrice=oldPrice-priceDeduction;
		this.setState({totalPrice:newPrice,ingredients:updateIngredients});
		this.updatePurchaseState(updateIngredients);


	}

	render()
	{

		const disabledInfo={
			...this.state.ingredients
		}
		for(let key in disabledInfo)
		{
			disabledInfo[key]=disabledInfo[key]<=0
		}
		return(

			<Aux>
				<Modal>
					<OrderSummary ingredients={this.state.ingredients} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControl  
				addIngredient={this.addIngredientHandler} 
				removeIngredient={this.removeIngredientHandler } 
				disabled={disabledInfo}
				purchasable={this.state.updatePurchaseState}
				price={this.state.totalPrice}/>
			</Aux>

			);
	}

}

export default BurgerBuilder;