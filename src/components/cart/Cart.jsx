import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Coupon from "../coupon/Coupon";
import { discountType, discountCouponInfo } from "../../constants/constant";
import {
  addQuantity,
  subtractQuantity,
  removeFromCart,
  emptyCart,
} from "../../redux/actions/cartActions";
import { applyCoupon, incrementOrderCount } from "../../redux/actions/couponActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const subTotal = useSelector((state) => state.cartReducer.cartTotal);
  const appliedCoupon = useSelector((state) => state.couponReducer.appliedCoupon);
  const orderCount = useSelector((state) => state.couponReducer.orderCount);

  const [cartTotal, setCartTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  const addCartQuantity = (item) => {
    dispatch(addQuantity(item));
  };

  const subtractCartQuantity = (item) => {
    dispatch(subtractQuantity(item));
  };

  const removeCartItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const showCouponModal = () => {
    if (orderCount === 3) {
      setShowModal(true);
    } else {
      toast.warn("This coupon is only applicable on your third order.", {
        position: "top-center", // Fixed positioning issue
      });
    }
  };

  const removeCoupon = useCallback(() => {
    dispatch(applyCoupon(null));
  }, [dispatch]);

  const checkout = () => {
    dispatch(emptyCart([]));
    dispatch(applyCoupon(null));
    dispatch(incrementOrderCount());
    navigate("/order");
  };

  const calculateDiscount = useCallback(() => {
    if (appliedCoupon) {
      let total;
      if (appliedCoupon?.discountType === discountType.amount) {
        total = subTotal - appliedCoupon.discountValue;
      } else if (appliedCoupon?.discountType === discountType.percent) {
        total = subTotal - subTotal * (appliedCoupon.discountValue / 100);
      }
      setCartTotal(Math.round(total));
    } else {
      setCartTotal(subTotal);
    }
  }, [appliedCoupon, subTotal]);

  useEffect(() => {
    calculateDiscount();
    if (subTotal === 0) removeCoupon();
    if (appliedCoupon && orderCount !== 3) {
      setIsInvalidCode(true);
    } else {
      setIsInvalidCode(false);
    }
  }, [subTotal, appliedCoupon, orderCount, removeCoupon, calculateDiscount]);

  return (
    <section className="py-8 px-4">
      <div className="text-2xl font-bold mb-4">Shopping Bag</div>
      <div className="container mx-auto">
        {cartItems.length ? (
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-7/12 mb-8 lg:mb-0">
              {cartItems.map((item) => (
                <div className="flex items-center border-b py-4" key={item.id}>
                  <div className="flex items-center w-5/12">
                    <img
                      src={item?.image || item?.images[0] || "/path/to/fallback-image.jpg"}
                      alt={item?.title || "cart item"}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div>
                      <div className="text-sm font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <div className="w-2/12 text-center text-gray-500">
                    <i> $ </i>
                    {item.price}
                  </div>
                  <div className="w-2/12 flex justify-center items-center">
                    <button className="px-2 py-1 border" onClick={() => subtractCartQuantity(item)}>
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      disabled
                      className="w-12 text-center border-t border-b"
                    />
                    <button className="px-2 py-1 border" onClick={() => addCartQuantity(item)}>
                      +
                    </button>
                  </div>
                  <div className="w-2/12 flex items-center justify-between">
                    <span>
                      <i> $ </i>
                      {parseFloat(item.quantity * item.price).toFixed(2)}
                    </span>
                    <button className="text-gray-500 text-xl" onClick={() => removeCartItem(item)}>
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-4/12 lg:ml-8">
              <div className="p-6 border mb-6">
                <div className="flex items-center border mb-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={appliedCoupon?.couponCode || ""}
                    disabled
                    className="w-full p-2 border-none text-sm"
                  />
                  {appliedCoupon?.couponCode ? (
                    <button className="bg-red-600 text-white py-2 px-4" onClick={() => removeCoupon()}>
                      REMOVE
                    </button>
                  ) : (
                    <button className="bg-red-600 text-white py-2 px-4" onClick={() => showCouponModal()}>
                      SELECT
                    </button>
                  )}
                </div>
                {isInvalidCode && (
                  <span className="text-red-600 text-sm">
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i> Coupon not valid for this order
                  </span>
                )}
                <div className="font-bold text-lg my-4">CART TOTALS</div>
                <div className="grid grid-cols-2 py-2 border-t">
                  <span>SUBTOTAL</span>
                  <span>
                    <i>$</i>
                    {parseFloat(subTotal).toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-2 border-t">
                  <span>DISCOUNT</span>
                  <span>
                    {appliedCoupon?.discountType === discountType.amount && <i>$</i>}
                    {appliedCoupon?.discountValue || 0}
                    {appliedCoupon?.discountType === discountType.percent && "%"}
                  </span>
                </div>
                <div className="grid grid-cols-2 py-2 border-t">
                  <span>TOTAL</span>
                  <span>
                    <i>$</i>
                    {parseFloat(cartTotal).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                className="w-full bg-green-600 text-white py-3 text-lg"
                onClick={() => checkout()}
                disabled={isInvalidCode}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h4 className="text-lg">Your bag is empty!</h4>
            <Link to="/" className="text-green-600 text-sm">
              RETURN TO SHOP
            </Link>
          </div>
        )}
      </div>
      <Coupon showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default Cart;
