import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

//prettier-ignore
const LotteryFormReview = ({ onCancel, formValues, submitLottery, history }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}>
                Back
            </button>
            <button
                onClick={() => submitLottery(formValues,history)}
                className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.lotteryForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(LotteryFormReview));
