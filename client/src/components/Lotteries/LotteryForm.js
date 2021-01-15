import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import LotteryField from "./LotteryField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class LotteryForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={LotteryField}
                    type="text"
                    label={label}
                    name={name}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onLotterySubmit
                    )}>
                    {this.renderFields()}
                    <Link to="/lotteries" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || "");

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = "You must provide a value";
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: "lotteryForm",
    destroyOnUnmount: false,
})(LotteryForm);
