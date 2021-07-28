const initialState = {
  loading: true,
  items: [],
  error: null,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "products/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "products/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "allProducts/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "allProducts/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case 'products/category/fetch/pending':
      return {
        ...state,
        loading: true
      }
    case 'products/category/fetch/fulfilled' :
      return {
        ...state,
        loading: false,
        items: action.payload
      }
    default:
      return state;
  }
};

export default products;

export const fetchProductByCategoryId = (id) => {
  return async (dispatch) => {
    dispatch({ type: "products/category/fetch/pending" });
    try {
      const response = await fetch(`/product/${id}/category`);
      const json = await response.json();
      dispatch({ type: "products/category/fetch/fulfilled", payload: json});
    } catch (e) {
      dispatch({
        type: "products/category/fetch/rejected",
        error: e.toString(),
      });
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: "products/fetch/pending" });
    try {
      const response = await fetch("/product");
      const json = await response.json();
      dispatch({ type: "products/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "products/fetch/rejected", error: e.toString() });
    }
  };
};

export const fetchAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: "products/fetch/pending" });
    try {
      const response = await fetch("/products");
      const json = await response.json();
      dispatch({ type: "products/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "products/fetch/rejected", error: e.toString() });
    }
  };
};


