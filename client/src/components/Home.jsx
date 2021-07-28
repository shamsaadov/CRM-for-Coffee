import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/products";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer/Footer";
import HomePage from "./Pages/HomePage";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    marginTop: 50,
    borderRadius: 5,
  },
  cardContent: {
    flexGrow: 1,
  },
}));
function Home(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const classes = useStyles();

  if (loading) {
    return (
      <div className="text-center position-absolute top-50 start-50">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <HomePage classes={classes} products={products} />
        <Footer classes={classes} />
      </>
    );
  }
}

export default Home;
