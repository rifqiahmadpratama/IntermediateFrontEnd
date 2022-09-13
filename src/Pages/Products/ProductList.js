import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/module/profil/profil.css";
import axios from "axios";
import ModalEdit from "../../components/ModalEdit";
import Profil from "../../components/module/profil/Profil";
import Footer from "../../components/module/home/footer/Footer";
import Navbar from "../../components/module/home/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../configs/redux/actions/productsActions";
import Swal from "sweetalert2";
import ModalCreate from "../../components/ModalCreate";

const ProductList = () => {
  const [products, getProducts] = useState([]);
  let product = useSelector((state) => state.delete);
  const dispatch = useDispatch();
  console.log(product);
  const navigate = useNavigate();
  console.log(navigate);
  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const createdAt = await axios.get(
        `${process.env.REACT_APP_API_BACKEND}product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createdAt.data.data);
      getProducts(createdAt.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const deleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${process.env.REACT_APP_API_BACKEND}product/${id}`)
          .then((res) => {
            fetchData();
            dispatch(deleteProduct(res));
            // navigate('/product')
            Swal.fire("Deleted!", "Your message has been deleted.", "success");
            console.log(res);
          });
      }
    });
  };

  return (
    <div className="my-bag">
      <Navbar />
      <div className="row">
        <div className="col-md-4 mt-4 ms-1">
          <Profil>
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 ms-5 small ">
              <li>
                <Link
                  to="/productlist"
                  className="link-dark d-inline-flex text-decoration-none rounded ms-3 mt-2"
                >
                  myProduct
                </Link>
              </li>
            </ul>
          </Profil>
        </div>
        <div className="col-md-6 offset-md-4 profil-form">
          <div className="card mt-3">
            <div className="card-body">
              <h4 className="mb-3">My Products</h4>

              <div className="d-flex flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight text-danger">all items</div>

                <hr />
              </div>
              <div className="input-group rounded nav-search w-25 mt-3">
                <input
                  autocomplete="off"
                  type="search"
                  className="form-control search-input"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  name="search"
                />
                <span
                  className="input-group-text search bg-light"
                  id="search-addon"
                >
                  <i className="bi bi-search"></i>
                </span>
              </div>

              <ModalCreate />
              <div className="table-responsive mt-4">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>stock</th>
                      <th>Deskripsion</th>

                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.description}</td>
                        {/* <td>{item.merk}</td> */}
                        <td>
                          <img src={item.photo} alt="" width={50} height={55} />
                        </td>
                        <td>
                          <ModalEdit
                            id={item.id}
                            name={item.name}
                            stock={item.stock}
                            price={item.price}
                            photo={item.photo}
                            description={item.description}
                          >
                            Edit
                          </ModalEdit>
                          <button
                            onClick={() => deleteCategory(item.id)}
                            className="btn btn-danger mt-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
