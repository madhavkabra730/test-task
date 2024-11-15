import React from 'react';

const Order = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="text-center">
        <i className="fa fa-check text-white text-4xl bg-green-600 rounded-full p-4 mb-4"></i>
        <h1 className="text-2xl font-bold">Your order is completed!</h1>
        <span className="text-lg">Thank you.</span>
      </div>
    </section>
  );
};

export default Order;
