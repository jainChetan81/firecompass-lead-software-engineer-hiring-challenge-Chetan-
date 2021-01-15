import { FETCH_LOTTERIES } from "../actions/types";

const lotteryReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_LOTTERIES:
            return action.payload;
        default:
            return state;
    }
};
export default lotteryReducer;
