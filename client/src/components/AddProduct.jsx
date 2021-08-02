import React, { useState } from "react";
import { TableCell, TableRow, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { fetchAddProduct, fetchUploadImg } from "../redux/features/products";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  input: {},
}));

function AddProduct(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const handleAddProduct = () => {
    dispatch(fetchAddProduct(id, { name, price, img, description }));
    setName("");
    setPrice("");
    setDescription("");
    setImg("")
  };

  // function handleChangeImg(e) {
  //   const file = e.target.files[0];
  //   dispatch(fetchUploadImg(file));
  // }

  const handlePostName = (e) => {
    setName(e.target.value);
  };
  const handlePostDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePostImg = (e) => {
    // const file = e.target.files[0];
    // console.log(file)
    // dispatch(fetchUploadImg(file));
    setImg(e.target.value)
  };
  const handlePostPrice = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <TableRow>
        <TableCell />
        <TableCell>
          <TextField
            type="text"
            value={name}
            placeholder=" название продукта"
            label=" название продукта"
            onChange={handlePostName}
          />
        </TableCell>
        <TableCell>
          <TextField
            type='text'
            value={img}
            placeholder='ссылка на имг'
            label=' ссылка на имг'
            onChange={handlePostImg}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="text"
            value={description}
            placeholder=" описание продукта"
            label=" описание продукта"
            onChange={handlePostDescription}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="text"
            value={price}
            placeholder=" цену продукта"
            label=" цену продукта"
            onChange={handlePostPrice}
          />
        </TableCell>
        <TableCell>
          {/*<TextField*/}
          {/*  type="text"*/}
          {/*  value={category}*/}
          {/*  placeholder="ID категории"*/}
          {/*  label="ID категории"*/}
          {/*  onChange={handlePostCategory}*/}
          {/*/>*/}
        </TableCell>
        <TableCell>
          <Button onClick={handleAddProduct}>Add</Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default AddProduct;
