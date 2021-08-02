import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import products, { fetchEditProduct } from "../redux/features/products";

function PatchProduct({ setOpen, open }) {
  const dispatch = useDispatch();

  const editProduct = useSelector((state) => state.products.productEdit);

  const edit = useSelector((state) => state.products.edit);

  const handleEditProductName = (e) => {
    dispatch({ type: "set/patch/name", payload: e.target.value });
  };
  const handleEditProductDesc = (e) => {
    dispatch({ type: "set/patch/description", payload: e.target.value });
  };
  const handleEditProductPrice = (e) => {
    dispatch({ type: "set/patch/price", payload: e.target.value });
  };

  const handleClose = (id) => {
    dispatch(fetchEditProduct(id, {
      name: editProduct.name,
      price: editProduct.price,
      description: editProduct.description
    }));
    setOpen(false);
  };

  if (!editProduct) {
    return null;
  }
  if (edit) {
    return (
      <div className="text-center position-absolute top-50 start-50">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  } else {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Введите ваши изменения</DialogTitle>
        <DialogContent>
          <p>
            <TextField
              value={editProduct.name}
              label="имя"
              placeholder="имя"
              type="text"
              onChange={handleEditProductName}
            />
          </p>
          <p>
            <TextField
              value={editProduct.description}
              label="Введите описание"
              placeholder="Введите описание"
              type="text"
              onChange={handleEditProductDesc}
            />
          </p>
          <p>
            <TextField
              value={editProduct.price}
              label="Введите цену"
              placeholder="Введите цену"
              type="text"
              onChange={handleEditProductPrice}
            />
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button onClick={() => handleClose(editProduct._id)} color="primary">
            Сохранить изменения
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default PatchProduct;
