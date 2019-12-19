import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/witherrorHandler/withErrorHandler';
import * as actionTypes from '../../store/action';





class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        
        

        purchasing: false,
        loading:false,
        error:false
    }

    componentDidMount(){
        console.log(this.props);
        /*axios.get('https://react-my-burger-91f47.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
        }).catch(error=>{
            this.setState({error:true});
        });*/
    }



    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

   

    

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
       
        this.props.history.push('/checkout');

    }

    
    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let ordersummary=null;
        
        
        let burger=this.state.error?<p>Ingredient's don't load!!</p>:<Spinner/>;
        if(this.props.ings){
            burger=(
                <Aux>
            <Burger ingredients={this.props.ings} />
            <BuildControls
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                price={this.props.price} />
                </Aux>
                );

                ordersummary=<OrderSummary 
                                ingredients={this.props.ings}
                                purchaseCancelled={this.purchaseCancelHandler}
                                 purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price} />
        if(this.state.loading)
        {
            ordersummary= <Spinner />
        }
        
        }

       

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}































            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));