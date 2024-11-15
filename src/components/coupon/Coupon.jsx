import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupons, applyCoupon } from '../../redux/actions/couponActions';

const Coupon = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const couponData = useSelector((state) => state.couponReducer.coupons);

  useEffect(() => {
    if (!couponData?.length) dispatch(getCoupons());
  }, [couponData, dispatch]);

  const hideCouponModal = () => {
    setShowModal(false);
  };

  const selectCoupon = (item) => {
    dispatch(applyCoupon(item));
    hideCouponModal();
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={() => hideCouponModal()}
        >
          <div
            className="bg-white rounded-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b">
              <h2 className="text-lg font-bold">AVAILABLE COUPONS</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => hideCouponModal()}
              >
                ✕
              </button>
            </div>
            {couponData?.map((item) => (
              <div key={item.id} className="p-4 mt-4 border rounded-md">
                <div className="text-sm font-semibold text-yellow-800 bg-yellow-100 inline-block px-3 py-1 mb-2 border border-yellow-300 rounded">
                  {item.couponCode}
                </div>
                <div className="text-base font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
                <button
                  className="mt-4 py-2 px-4 border border-red-600 text-red-600 rounded hover:bg-red-100 transition"
                  onClick={() => selectCoupon(item)}
                >
                  APPLY COUPON
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Coupon;
