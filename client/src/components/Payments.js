import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
    onToken = (token) => {
        console.log("token of stripe is :", token);
        this.props.handleToken(token);
    };
    render() {
        return (
            <div>
                <StripeCheckout
                    stripeKey={process.env.REACT_APP_STRIPE_KEY}
                    name="Emaily"
                    description="₹5 for 5 email credits"
                    amount={500}
                    currency="INR"
                    token={this.onToken} //a callback function from stripe
                >
                    <button className="btn">Add Credits</button>
                </StripeCheckout>
            </div>
        );
    }
}
export default connect(null, actions)(Payments);
