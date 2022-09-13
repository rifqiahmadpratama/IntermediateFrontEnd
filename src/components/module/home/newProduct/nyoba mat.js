import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../StyleHome.css";
// import productsss from '../../../assets/image/product.png'
// import detail  from '../../../Pages/DetailProduct'
import axios from "axios";
const Product = ({ title, subtitle }) => {
  // const [products, setProducts] = useState([
  //   {
  //     id: 1,
  //     titleproduct: "Product 1",
  //     price: 899,
  //     image: "../../../assets/image/product.png",
  //     merk: "zalora",
  //   },
  //   {
  //     id: 2,
  //     titleproduct: "Product 2",
  //     price: 899,
  //     image: "../../../assets/image/product.png",
  //     merk: "zalora",
  //   },
  //   {
  //     id: 3,
  //     titleproduct: "Product 3",
  //     price: 899,
  //     image: "../../../assets/image/product.png",
  //     merk: "zalora",
  //   },
  //   {
  //     id: 4,
  //     titleproduct: "Product 4",
  //     price: 899,
  //     image: "../../../assets/image/product.png",
  //     merk: "zalora",
  //   },
  //   {
  //     id: 5,
  //     "title-product": "Product 5",
  //     price: 899,
  //     image: "../../../assets/image/product.png",
  //     merk: "zalora",
  //   },
  // ]);

  const [products, setProducts] = useState([]);
  const [searchItem, setSearch] = useState("");

  // const getData = () => {
  //   fetch("http://localhost:4000/v1/products/AllProduct")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res.data[0].image.split(",")[0]);
  //       setProducts(res.data);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);
  async function fetchData() {
    try {
      const result = await axios({
        method: "GET",
        baseURL: "http://localhost:4000/v1",
        url: "/products/AllProduct",
      });
      console.log(result.data.data[0].image.split(",")[0]);
      setProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // axios
    //   .get("http://localhost:4000/v1/category")
    // axios({
    //   method: 'GET',
    //   baseURL: 'http://localhost:4000/v1',
    //   url: '/category'
    // })
    //   .then((res) => {
    //     // console.log(res.data.data);
    //     setCategory(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">{title}</h3>
            <p>{subtitle}</p>
          </div>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products
              .filter((val) => {
                if (searchItem === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchItem.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item) => (
                <div className="col" key={item.id}>
                  <div className="card shadow-sm">
                    <img
                      src={item.image.split(",")[0]}
                      className="img-fluid"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/detail/${item.id}`}>{item.name}</Link>
                      </h5>
                      <p className=" price">{item.price}</p>
                      <p className="card-text merk">{item.idcategory}</p>
                      <div className="d-flex justify-content-start text-warning start">
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <div className="bi-star-fill"></div>
                        <p className="rating  mt-2 ms-1 text-dark">(10)</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
