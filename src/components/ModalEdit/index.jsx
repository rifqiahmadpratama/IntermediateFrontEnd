import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import updateProduct from "../../configs/redux/actions/updateproductAction";

const ModalEdit = ({
  children,
  id,
  name,
  stock,
  price,
  photo,
  description,
  category_id,
  transaksi_id,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [saveImage, setSaveImage] = useState(photo);
  function handleUpload(e) {
    console.log(e.target.files[0]);
    const uploader = e.target.files[0];
    setSaveImage(uploader);
  }
  const [data, setData] = useState({
    name,
    stock,
    price,
    photo,
    description,
    category_id,
    transaksi_id,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(data, id, saveImage, setShow));
  };

  return (
    <Fragment>
      <button
        className="btn btn-dark text-light"
        style={{ marginRight: "10px" }}
        onClick={handleShow}
      >
        {children}
      </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="name"
              id={id}
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="stock"
              id={id}
              name="stock"
              value={data.stock}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="price"
              id={id}
              name="price"
              value={data.price}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="file"
              placeholder="photo"
              id={id}
              name="photo"
              onChange={handleUpload}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="description"
              id={id}
              name="description"
              value={data.description}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="category_id"
              id={id}
              name="category_id"
              value={data.category_id}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="transaksi_id"
              id={id}
              name="transaksi_id"
              value={data.transaksi_id}
              onChange={handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" id="button-addon2" title="Register">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Fragment>
  );
};

export default ModalEdit;
