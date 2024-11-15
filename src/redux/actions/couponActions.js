import axios from "axios";
import { COUPONS } from "./constants";

// Get coupons
export const getCoupons = () => async (dispatch) => {
  dispatch({ type: COUPONS.GET });
  try {
    const response = await axios.get("./db/coupons.json");
    return dispatch({ type: COUPONS.GET, payload: response.data });
  } catch (err) {
    return dispatch({ type: COUPONS.GET, payload: [] });
  }
};

// Apply a coupon
export const applyCoupon = (item) => ({
  type: COUPONS.APPLY,
  payload: item,
});

// Count of applied coupons
export const appliedCount = () => ({
  type: COUPONS.APPLIED_COUNT,
  payload: null,
});

// Increment order count
export const incrementOrderCount = () => ({
  type: COUPONS.INCREMENT_ORDER_COUNT,
});
