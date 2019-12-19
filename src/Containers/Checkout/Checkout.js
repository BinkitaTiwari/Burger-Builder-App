import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
class Checkout extends Component{
    
    checkoutCancel=(props)=>{
        this.props.history.goBack();
    }

    
    
    checkoutContinue=(props)=>{
        this.props.history.replace('/Checkout/contact-data');
    }

    render()
    {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings} 
                 checkoutContinue={this.checkoutContinue}
                 checkoutCancel={this.checkoutCancel}/>
                 <Route 
                 path={this.props.match.path + '/contact-data'} 
                 component={ContactData}
                  
                 />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};
export default connect(mapStateToProps)(Checkout);