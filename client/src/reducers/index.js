import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import lotteryReducer from "./lotteryReducer";

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    lotteries: lotteryReducer,
});
