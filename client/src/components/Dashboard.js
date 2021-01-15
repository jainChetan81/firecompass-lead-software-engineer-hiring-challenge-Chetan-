import React from "react";
import { Link } from "react-router-dom";
import LotteryList from "./Lotteries/LotteryList";
import { connect } from "react-redux";

const Dashboard = ({ auth }) => {
    return (
        <div>
            <LotteryList />
            <div className="fixed-action-btn">
                {auth.admin && (
                    <Link
                        to="/lotteries/new"
                        className="btn-floating btn-large red">
                        <i className="material-icons">+</i>
                    </Link>
                )}
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { auth: state.auth };
}
export default connect(mapStateToProps)(Dashboard);
