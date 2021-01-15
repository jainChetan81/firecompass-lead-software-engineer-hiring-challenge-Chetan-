import React, { Component } from "react";
import { reduxForm } from "redux-form";
import LotteryForm from "./LotteryForm";
import LotteryFormReview from "./LotteryFormReview";

class LotteryNew extends Component {
    state = { show: "lotteryForm" };

    renderContent() {
        if (this.state.show === "lotteryForm") {
            return (
                <LotteryForm
                    onLotterySubmit={() =>
                        this.setState({ show: "lotteryFormReview" })
                    }
                />
            );
        }
        if (this.state.show === "lotteryFormReview") {
            return (
                <LotteryFormReview
                    onCancel={() => this.setState({ show: "lotteryForm" })}
                />
            );
        }
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: "lotteryForm",
})(LotteryNew);
