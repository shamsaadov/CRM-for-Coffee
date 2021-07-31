import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByCategoryId,
  fetchDeleteProduct, setEditProduct,
} from "../../redux/features/products";
import { makeStyles, Toolbar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddProduct from "../AddProduct";
import PatchProduct from '../PatchProduct';

const useStyles = makeStyles((theme) => ({
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

function SingleProductPage() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(fetchProductByCategoryId(id));
  }, [dispatch, id]);

  const handleClickOpen = (products) =>{
    dispatch(setEditProduct(products))
    setOpen(true)
  }


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
        <AddProduct />
        <TableContainer component={Paper} className={classes.mainTable}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell className={classes.fontTable}>#</TableCell>
                <TableCell align="left" className={classes.fontTable}>
                  Name
                </TableCell>
                <TableCell align="left" className={classes.fontTable}>
                  View
                </TableCell>
                <TableCell align="left" className={classes.fontTable}>
                  Description
                </TableCell>
                <TableCell align="left" className={classes.fontTable}>
                  Price
                </TableCell>
                <TableCell align="left" className={classes.fontTable}>
                  Edit
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
                  <TableCell align="left" className={classes.fontTable}>
                    {products.name}
                  </TableCell>
                  <TableCell align="left" className={classes.fontTable}>
                    <img
                      src={products.img}
                      alt=""
                      className={classes.tableImg}
                    />
                  </TableCell>
                  <TableCell align="left" className={classes.desc}>
                    {products.description}
                  </TableCell>
                  <TableCell align="left" className={classes.fontTable}>
                    {products.price} ₽
                  </TableCell>
                  <TableCell align="left" className={classes.fontTable}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleClickOpen(products)}
                    >
                      Изменить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PatchProduct
        setOpen={open}
        open={open}
        />
      </>
    );
  }
}

export default SingleProductPage;
