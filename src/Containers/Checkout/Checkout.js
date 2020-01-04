import React, { Component } from 'react';
import {connect,} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
//import * as actions from '../../store/action/index';
class Checkout extends Component{
    
    checkoutCancel=(props)=>{
        this.props.history.goBack();
    }

    
    
    checkoutContinue=(props)=>{
        this.props.history.replace('/Checkout/contact-data');
    }

    render()
    {
        let summary = <Redirect to="/" />
        if ( this.props.ings ) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutContinue={this.checkoutContinue}
                        checkoutCancel={this.checkoutCancel}/>
                        <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />

            </div>
                  
            );
        }

        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);