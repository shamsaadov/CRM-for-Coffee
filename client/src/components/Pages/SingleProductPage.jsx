import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByCategoryId } from "../../redux/features/products";
import Container from "@material-ui/core/Container";

function SingleProductPage(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  useEffect(() => {
    dispatch(fetchProductByCategoryId(id));
  }, [dispatch, id]);
  if (loading) {
    return (
      <div className="text-center position-absolute top-50 start-50">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  } else {

  }
}

export default SingleProductPage;
