import axios from "axios";
import { toast } from "react-toastify";
import { FETCH_USER, FETCH_LOTTERIES } from "./types";

export const fetchUser = () => (dispatch) => {
    axios.get("/api/current_user").then((res) => {
        dispatch({ type: FETCH_USER, payload: res.data });
    });
};
export const handleToken = (token) => async (dispatch) => {
    await axios.post("/api/stripe", token).then((res) => {
        dispatch({ type: FETCH_USER, payload: res.data });
    });
};

export const submitLottery = (lotteryFormValue, history) => (dispatch) => {
    console.log("lotteryFormValue", lotteryFormValue);
    axios
        .post("/api/lotteries", {
            lotteries: lotteryFormValue,
        })
        .then((res) => {
            dispatch({ type: FETCH_USER, payload: res.data });
            console.log("res", res);
            toast("Lottery Created");
            setTimeout(() => {
                history.push("/");
            }, 3000);
            history.push("/lotteries");
        })
        .catch((err) => console.log(err));
};
export const paticipateLottery = (lotteryId) => () => {
    console.log("lotteryId", lotteryId);
    axios
        .post("/api/participatingRoutes", {
            lotteryId,
        })
        .then((res) => {
            console.log("res", res);
            toast("Lottery Participated");
        })
        .catch((err) => console.log(err));
};

export const fetchLotteries = () => (dispatch) => {
    axios
        .get("/api/lotteries")
        .then((res) => {
            dispatch({ type: FETCH_LOTTERIES, payload: res.data });
        })
        .catch((err) => console.log(err));
};
