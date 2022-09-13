import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styleCreate.css";
import Profil from "../profil/Profil";
import { useNavigate } from "react-router-dom";
import Input from "../../base/Input/Input"
import deskripsi from "../../../assets/image/seling-product/summernote.png";
// import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../configs/redux/actions/productsActions";
const CreateProduct = () => {
    const navigate = useNavigate()
    const [image, setImage] = useState(["https://fakeimg.pl/350x250/"]);
    const [name, setName] = useState('')
    const [description, setDeskripsion] = useState('')
    const [stock, setStock] = useState('')
    const [merk, setMerk] = useState("");
    const [price, setPrice] = useState('')
    const [typestock, setTypestock] = useState("");
    // const [idcategory, setCategory] = useState("");
    const [imagePreview, setImagePreview] = useState(
      ["https://fakeimg.pl/350x250/"]
  );
  console.log();
  const { isLoading } = useSelector((state) => state.Createproducts);
   const { user } = useSelector((state) => state.auth);
  console.log(user);
   const iduser = user.id
    const dispatch = useDispatch();
   
    const onSubmit = (e) => {
      const data = new FormData();
      data.append("name", name);
      data.append("description", description);
      data.append("stock", stock);
      data.append("merk", merk);
      data.append("price", price);
      data.append("typestock", typestock);
      data.append("image", image);
      data.append("iduser", iduser);
      // data.append("idcategory", idcategory);
        e.preventDefault();
         dispatch(createProduct(data, navigate));
        //  navigate("/productList");
        // dispatch(createProduct(data));
  };
  const onImageUpload = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="my-bag">
        <div className="row">
          <Profil>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 ms-5 small ">
              <li>
                <Link
                  to="/productlist"
                  className="link-dark d-inline-flex text-decoration-none rounded ms-3 mt-2 text-secondary"
                >
                  myProduct
                </Link>
              </li>
              <li>
                <Link
                  to="/selling"
                  className="link-dark d-inline-flex text-decoration-none rounded ms-3 mt-3 "
                >
                  selling
                </Link>
              </li>
            </ul>
          </Profil>
          <div className="col-lg-7 profil-form">
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Inventory</h3>
                <div className="line"></div>
                <div className="row mt-3 ms-1">
                  <div className="col-sm-8">
                    <div className="mb-3 row">
                      <label
                        htmlFor="Name"
                        className="col-sm-4 col-form-label text-secondary"
                      >
                        Name of goods
                      </label>
                      <Input
                        id="floatingInput"
                        value={name}
                        placeholder="masukan nama"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Item details</h3>
                <div className="line"></div>
                <div className="row mt-3 ms-1">
                  <div className="col-sm-8">
                    <div className="mb-3 row">
                      <label
                        htmlFor="Name"
                        className="col-sm-4 col-form-label text-secondary"
                      >
                        Unit price
                      </label>
                      <Input
                        name="price"
                        type="number"
                        value={price}
                        placeholder="price"
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control form-control-lg ms-2 mt-2 name-input"
                      />
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="Merk"
                        className="col-sm-4 col-form-label text-secondary"
                      >
                        Unit Merk
                      </label>
                      <Input
                        name="merk"
                        value={merk}
                        placeholder="merk"
                        onChange={(e) => setMerk(e.target.value)}
                        className="form-control form-control-lg ms-2 mt-2 name-input"
                      />
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="mb-3 row">
                      <label
                        htmlFor="Name"
                        className="col-sm-4 col-form-label text-secondary"
                      >
                        Stock
                      </label>
                      <Input
                        id="floatingPassword"
                        name="stock"
                        type="number"
                        value={stock}
                        placeholder="Stock"
                        onChange={(e) => setStock(e.target.value)}
                        className="form-control form-control-lg ms-2 mt-2 name-input"
                      />
                    </div>
                  </div>
                  <div className="col-sm-8 mt-3 mb-4">
                    <label
                      htmlFor="Name"
                      className="col-sm-12 col-form-label ms-2 mb-2 text-secondary"
                    >
                      Stock
                    </label>
                    <div className="stock-radio">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="typestock"
                        value="baru"
                        checked={typestock === "baru"}
                        onChange={(e) => setTypestock(e.target.value)}
                      />
                      <label
                        className="form-check-label text-secondary ms-2"
                        htmlFor="flexRadioDefault1"
                      >
                        baru
                      </label>
                      <input
                        className="form-check-input ms-4"
                        type="radio"
                        name="typestock"
                        value="bekas"
                        checked={typestock === "bekas"}
                        onChange={(e) => setTypestock(e.target.value)}
                      />
                      <label
                        className="form-check-label text-secondary ms-2"
                        htmlFor="flexRadioDefault1 "
                      >
                        Bekas
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Photo of goods</h3>
                <div className="line"></div>
                <div className="row mt-3 ms-2 me-2 photo-form">
                  <div className="col-sm-3 ms-2 mt-3">
                    <div className="card card-image">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid "
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                    <p className="text-center mt-2 text-secondary">
                      Foto utama
                    </p>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card ">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card ">
                      <img
                        src={imagePreview}
                        alt="Bootstrap"
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-2 mt-5 upload">
                    <div className="card ">
                      <img
                        alt="Bootstrap"
                        src={imagePreview}
                        className="img-fluid"
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-center align-items-center">
                        <img src="../image/seling-product/box 5.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <hr className="upload" />
                  <div className="text-center mb-3">
                    <input
                      multiple
                      onChange={(e) => onImageUpload(e)}
                      className="form-control btn btn-upload"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h3 className="title-selling mt-2">Description</h3>
                <div className="line"></div>
                <div className="col-lg-12 mb-1 mt-4">
                  <div className="card">
                    <div className="card-body description">
                      <img src={deskripsi} alt="" />
                      <div className="garis"></div>
                      <textarea
                        className="form-control"
                        id="floatingEmail"
                        name="description"
                        type="description"
                        value={description}
                        onChange={(e) => setDeskripsion(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="col-sm-12 text-end">
                <button className="btn btn-jual" type="submit">
                  {isLoading ? "Loading..." : "Jual"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
