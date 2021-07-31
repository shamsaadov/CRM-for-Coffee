import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { fetchEditProduct } from "../redux/features/products";

function PatchProduct({ open, setOpen }) {
  const dispatch = useDispatch();

  const editProduct = useSelector((state) => state.products.productEdit);

  const [name, setName] = useState(editProduct.name);
  const [description, setDescription] = useState(editProduct.description);
  const [price, setPrice] = useState(editProduct.price);

  const handleEditProductName = (e) => {
    setName(e.target.value);
  };
  const handleEditProductDesc = (e) => {
    setDescription(e.target.value);
  };
  const handleEditProductPrice = (e) => {
    setPrice(e.target.value);
  };

  const handleClose = (id) => {
    console.log(id);
    dispatch(fetchEditProduct(id, { name, description, price }));
    setOpen(false);
  };

  if (!editProduct) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Введите ваши изменения</DialogTitle>
      <DialogContent>
        <TextField
          value={name}
          label="Введите название"
          placeholder="Введите название"
          type="text"
          onChange={handleEditProductName}
        />
        <TextField
          value={description}
          label="Введите описание"
          placeholder="Введите описание"
          type="text"
          onChange={handleEditProductDesc}
        />
        <TextField
          value={price}
          label="Введите цену"
          placeholder="Введите цену"
          type="text"
          onChange={handleEditProductPrice}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Закрыть
        </Button>
        <Button onClick={() => handleClose(editProduct._id)} color="primary">
          Сохранить изменения
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PatchProduct;
