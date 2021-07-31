import React, { useEffect } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchDeleteProduct,
} from "../../redux/features/products";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardContent: {
    flexGrow: 1,
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
  table: {
    minWidth: 650,
  },
  fontTable: {
    fontSize: 25,
  },
  button: {
    fontSize: 25,
    margin: theme.spacing(1),
  },
  tableImg: {
    width: 150,
    height: 100,
    borderRadius: 5,
  },
  desc: {
    width: 450,
    fontSize: 25,
  },
}));

function ProductsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const deleting = useSelector((state) => state.products.deleting)
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);
  if (!loading) {
    return (
      <>
        <Header />
        <TableContainer component={Paper} className={classes.mainTable}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right" className={classes.fontTable}>
                  Name
                </TableCell>
                <TableCell align="right" className={classes.fontTable}>
                  View
                </TableCell>
                <TableCell align="right" className={classes.fontTable}>
                  Description
                </TableCell>
                <TableCell align="right" className={classes.fontTable}>
                  Price
                </TableCell>
                <TableCell align="right" className={classes.fontTable}>
                  Delete
                </TableCell>
                <TableCell align="right" className={classes.fontTable}>
                  Купить
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((products, index) => (
                <TableRow key={products.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.fontTable}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell align="right" className={classes.fontTable}>
                    {products.name}
                  </TableCell>
                  <TableCell align="right" className={classes.fontTable}>
                    <img
                      src={products.img}
                      alt=""
                      className={classes.tableImg}
                    />
                  </TableCell>
                  <TableCell align="right" className={classes.desc}>
                    {products.description}
                  </TableCell>
                  <TableCell align="right" className={classes.fontTable}>
                    {products.price} ₽
                  </TableCell>
                  <TableCell align="right" className={classes.fontTable}>
                    {" "}
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      disabled={deleting}
                      onClick={() => {
                        dispatch(fetchDeleteProduct(products._id));
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" className={classes.fontTable}>
                    <Button variant="contained" color="primary">
                      Купить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  } else {
    return (
      <div className="text-center position-absolute top-50 start-50">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }
}

export default ProductsPage;
