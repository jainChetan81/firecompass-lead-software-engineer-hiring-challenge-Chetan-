import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
    renderContent() {
        const { auth } = this.props;
        switch (auth) {
            case null:
                return "Still deciding";
            case false:
                return (
                    <li>
                        <a href="/auth/google">Log In</a>
                    </li>
                );
            default:
                return (
                    <ul>
                        {!auth.admin && (
                            <>
                                <li key="1">
                                    <Payments />
                                </li>
                                <li style={{ margin: "0 10px" }} key="3">
                                    Credits: {this.props.auth.credits}
                                </li>
                            </>
                        )}

                        <li key="2">
                            <a href="/api/logout">Log Out</a>
                        </li>
                    </ul>
                );
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <NavLink
                        className="left brand-logo"
                        to={this.props.auth ? "/lotteries" : "/"}>
                        Emaily
                    </NavLink>
                    <div className="right">{this.renderContent()}</div>
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(Header);
