import { COUPONS } from "../actions/constants";

const initState = {
  coupons: [],
  appliedCoupon: null,
  appliedCouponCount: 0,
  orderCount: 1,
};

const couponReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case COUPONS.GET:
      return {
        ...state,
        coupons: payload,
      };
    case COUPONS.APPLY:
      return {
        ...state,
        appliedCoupon: payload,
      };
    case COUPONS.APPLIED_COUNT:
      return {
        ...state,
        appliedCouponCount: state.appliedCouponCount + 1,
      };
    case COUPONS.INCREMENT_ORDER_COUNT:
      return {
        ...state,
        orderCount: state.orderCount + 1,
      };
    default:
      return state;
  }
};

export default couponReducer;
