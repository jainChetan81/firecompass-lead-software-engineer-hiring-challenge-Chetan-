import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLotteries, paticipateLottery } from "../../actions";

class LotteryList extends Component {
    state = {
        errorMessage: "",
    };
    async componentDidMount() {
        await this.props.fetchLotteries();
    }

    participationCriteria(lottery) {
        const { auth, paticipateLottery } = this.props;
        let criteriaFailed = false;
        let error = "";
        if (lottery.Entry_Fee > auth.credits) {
            criteriaFailed = true;
            error = "You Dont have enough credits";
        }
        if (lottery.Participants_Number > 0) {
            criteriaFailed = true;
            error = "Participant Number is full";
        }
        console.log("lottery.participants", lottery);
        lottery.participants.map((participant) => {
            if (participant.name === auth.name) {
                criteriaFailed = true;
                error = "You have already Registered";
            }
        });
        this.setState({
            errorMessage: error,
        });
        if (criteriaFailed) alert(error);
        else paticipateLottery(lottery._id);
    }

    renderLotteries() {
        const { lotteries } = this.props;
        if (lotteries.length > 0) {
            return lotteries.reverse().map((lottery) => {
                return (
                    <div className="card darken-1" key={lottery._id}>
                        <div className="card-content">
                            <span className="card-title">{lottery.title}</span>
                            <p>{lottery.body}</p>
                            <span>
                                <button
                                    className="red btn-flat white-text"
                                    onClick={() =>
                                        this.participationCriteria(lottery)
                                    }>
                                    Participate
                                </button>
                            </span>
                            <p className="right">
                                Sent On:
                                {new Date(
                                    lottery.dateSent
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                );
            });
        }
        if (lotteries.length <= 0) return <h1>Nothing to show here</h1>;
    }

    render() {
        return <div>{this.renderLotteries()}</div>;
    }
}

function mapStateToProps({ lotteries, auth }) {
    return { lotteries, auth };
}

export default connect(mapStateToProps, { fetchLotteries, paticipateLottery })(
    LotteryList
);
