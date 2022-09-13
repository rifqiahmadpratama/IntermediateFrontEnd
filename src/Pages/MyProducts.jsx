/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Footer from "../components/module/home/footer/Footer";
import Navbar from "../components/module/home/navbar/Navbar";
import Card from "../components/base/Card";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const MyProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);

  const handleSort = (e) => {
    setSort(e.currentTarget.value);
  };
  console.log(search);
  const handleSearch = (e) => {
    e.preventDefault();
    getProducts();
    setSearchParams({
      search,
      sort,
    });
  };
  const getProducts = async () => {
    const cari =
      searchParams.get("search") === null ? "" : searchParams.get("search");
    axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}product?search=${cari}&sort=${sort}`
      )
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log("Cek data Error = " + error);
      });
  };
  useEffect(() => {
    getProducts();
    setSearch(searchParams.get("search"));
    searchParams.get("search");
    searchParams.get("sort");
  }, [searchParams]);

  return (
    <div className="h-100">
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">New</h3>
            <p className="mt-5">My Products List</p>
          </div>

          {/* <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5">
        </div> */}
          <form onSubmit={handleSearch}>
            <select onChange={handleSort}>
              <option value="">Pilih Option</option>
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </select>
            <button type="submit">Sort</button>
          </form>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products.length > 0 ? (
              products.map((item) => (
                <div className="col" key={item.id}>
                  <Card
                    src={item.photo}
                    to={`/detail/${item.id}`}
                    titleName={item.name}
                    price={item.price}
                  />
                </div>
              ))
            ) : (
              <div className=" text-center m-auto mb-5">
                <h2>Product Not Found :(</h2>
                <Footer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
