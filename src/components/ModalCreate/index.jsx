import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalCreate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState({
    nama: "",
    stock: "",
    price: "",
    description: "",
    category_id: "",
    transaksi_id: "",
  });

  const [photo, setPhoto] = useState(null);

  const handleUpload = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("photo", photo);
    formData.append("description", data.description);
    formData.append("category_id", "3");
    formData.append("transaksi_id", "3");
    axios
      .post(process.env.REACT_APP_API_BACKEND + "product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("product created");
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setShow(false);
      });
  };

  return (
    <>
      <button className="btn btn-success mt-3" onClick={handleShow}>
        Create
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleCreate}>
          <Modal.Body>
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="stock"
              name="stock"
              value={data.stock}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="price"
              name="price"
              value={data.price}
              onChange={handleChange}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="file"
              placeholder="photo"
              name="photo"
              onChange={handleUpload}
            />
            <input
              autocomplete="off"
              className="form-control mt-3"
              type="text"
              placeholder="description"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default ModalCreate;
