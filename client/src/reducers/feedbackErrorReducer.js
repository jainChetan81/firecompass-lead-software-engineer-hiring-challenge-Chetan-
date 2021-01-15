import { ERROR_FEEDBACK } from "../actions/types";

const feedbackErrorReducer = (state = [], action) => {
    switch (action.type) {
        case ERROR_FEEDBACK:
            return action.payload;
        default:
            return state;
    }
};
export default feedbackErrorReducer;
