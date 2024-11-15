import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";

const Products = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productReducer.products);
  const selectCartItems = useSelector((state) => state.cartReducer.cartItems);

  useEffect(() => {
    if (!productData?.length) {
      dispatch(getProducts());
    }
  }, [dispatch, productData]);

  const addCartItem = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <section className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productData?.map((item) => {
          const inCart = selectCartItems.some(
            (cartItem) => cartItem.id === item.id
          );

          return (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              <div className="mt-2 text-gray-700 font-bold">
                <span className="text-lg">${item.price}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                {inCart ? (
                  <button className="text-green-600 font-semibold" disabled>
                    <i className="fa fa-check-circle mr-2"></i> In Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addCartItem(item)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    <i className="fa fa-plus mr-2"></i>Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
