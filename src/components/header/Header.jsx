import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cartItemCount = useSelector(
    (state) => state.cartReducer.cartItems.length
  );

  return (
    <header className="fixed top-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-4 z-10">
      <Link to="/" className="flex items-center">
        <img className="h-10 w-auto" src="/assets/logo.png" alt="logo" />
        <span className="ml-2 text-xl font-semibold">Shopping</span>
      </Link>
      <div className="relative flex items-center space-x-4 cursor-pointer">
        <span className="font-semibold text-gray-700">Hello, There</span>
        <Link to="/cart">
          <i className="fa fa-shopping-cart text-xl text-gray-700"></i>
          {cartItemCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
