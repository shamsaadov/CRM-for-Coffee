const initialState = {
  loading: true,
  items: [],
  error: null,
};


const categories = (state = initialState, action) => {
  switch (action.type) {
    case "categories/fetch/pending":
      return {
        ...state,
        loading: true,
      };
    case "categories/fetch/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    default:
      return state;
  }
};
export default categories;

export const fetchAllCategories = () => {
  return async (dispatch) => {
    dispatch({ type: "categories/fetch/pending" });
    try {
      const response = await fetch("/category");
      const json = await response.json();
      dispatch({ type: "categories/fetch/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "categories/fetch/rejected", error: e.toString() });
    }
  };
};

