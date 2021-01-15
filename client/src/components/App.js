import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import "materialize-css/dist/css/materialize.min.css";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard";
import LotteryNew from "./Lotteries/LotteryNew";

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        {!this.props.auth && (
                            <Route exact path="/" component={Landing} />
                        )}
                        {this.props.auth && (
                            <>
                                <Route
                                    exact
                                    path="/lotteries"
                                    component={Dashboard}
                                />
                                {this.props.auth.admin && (
                                    <Route
                                        exact
                                        path="/lotteries/new"
                                        component={LotteryNew}
                                    />
                                )}
                                <Redirect to="/lotteries" />
                            </>
                        )}
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}
export default connect(mapStateToProps, actions)(App);
