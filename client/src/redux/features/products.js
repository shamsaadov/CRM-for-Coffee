const initialState = {
  loading: true,
  deleting: false,
  post: false,
  edit: false,
  items: [],
  productEdit: {},
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
    case "products/category/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "products/category/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "product/delete/fetch/pending":
      return {
        ...state,
        deleting: true,
      };
    case "product/delete/fetch/fulfilled":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case "product/add/fetch/pending":
      return {
        ...state,
        post: true,
      };
    case "product/add/fetch/fulfilled":
      return {
        ...state,
        post: false,
        items: [...state.items, action.payload],
      };
    case "product/edit/fetch/pending":
      return {
        ...state,
        edit: true,
      };
    case "product/edit/fetch/fulfilled":
      return {
        ...state,
        edit: false,
        items: state.items.map((item) => {
          if (item._id === action.payload.id) {
            return {
              ...item,
              ...action.payload.data,
            };
          }
          return item;
        }),
      };

    case "product/set/editing":
      return {
        ...state,
        productEdit: action.payload,
      };

    case "set/patch/name":
      return {
        ...state,
        productEdit: {
          ...state.productEdit,
          name: action.payload,
        },
      };
    case "set/patch/description":
      return {
        ...state,
        productEdit: {
          ...state.productEdit,
          description: action.payload,
        },
      };
    case "set/patch/price":
      return {
        ...state,
        productEdit: {
          ...state.productEdit,
          price: action.payload,
        },
      };

    // case "img/create/pending":
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case "img/create/fulfilled":
    //   return {
    //     ...state,
    //     loading: false,
    //     items: {
    //       ...state,
    //       img: action.payload,
    //     },
    //   };
    // case "img/create/rejected":
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error,
    //   };

    default:
      return state;
  }
};

export default products;

export const setEditProduct = (products) => {
  return {
    type: "product/set/editing",
    payload: products,
  };
};

// export const fetchUploadImg = (file) => {
//   return async (dispatch, getState) => {
//     const { state } = getState();
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = await fetch("/productImg", {
//         method: "POST",
//         body: formData,
//       });
//       const json = await response.json();
//       dispatch({ type: "img/create/fulfilled", payload: json.image });
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// };

export const fetchEditProduct = (id, data) => {
  return async (dispatch, getState) => {
    const { products } = getState();
    dispatch({ type: "product/edit/fetch/pending" });
    try {
      await fetch(`/category/${products.productEdit._id}/product`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: products.productEdit.name,
          description: products.productEdit.description,
          price: products.productEdit.price,
        }),
      });
      await dispatch({
        type: "product/edit/fetch/fulfilled",
        payload: { id, data }, // если убрать приходится обновлять для изменения
      });
    } catch (e) {
      dispatch({ type: "product/edit/fetch/rejected", error: e.message });
    }
  };
};

export const fetchAddProduct = (id, data) => {
  return async (dispatch, getState) => {
    const { state } =getState()
    dispatch({ type: "product/add/fetch/pending" });

    try {
      const response = await fetch(`/category/${id}/product`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();
      dispatch({ type: "product/add/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "product/add/fetch/rejected", error: e.message });
    }
  };
};

export const fetchDeleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: "product/delete/fetch/pending" });
    try {
      await fetch(`/category/${id}/product`, {
        method: "DELETE",
      });
      dispatch({ type: "product/delete/fetch/fulfilled", payload: id });
    } catch (e) {
      dispatch({ type: "product/delete/fetch/rejected", error: e.toString() });
    }
  };
};

export const fetchProductByCategoryId = (id) => {
  return async (dispatch) => {
    dispatch({ type: "products/category/fetch/pending" });
    try {
      const response = await fetch(`/product/${id}/category`);
      const json = await response.json();
      dispatch({ type: "products/category/fetch/fulfilled", payload: json });
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
