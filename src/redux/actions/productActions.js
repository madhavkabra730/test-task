import axios from "axios";
import { PRODUCTS } from './constants';

export const getProducts = () => async dispatch => {
  await dispatch({ type: PRODUCTS.GET });
  try {
    const response = await axios.get("https://dummyjson.com/products");
    return dispatch({ type: PRODUCTS.GET, payload: response.data.products });
  } catch (err) {
    console.error('Error fetching products:', err);
    return dispatch({ type: PRODUCTS.GET, payload: [] });
  }
};
