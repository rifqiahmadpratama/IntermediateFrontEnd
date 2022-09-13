import React, { useEffect } from "react";
import "../StyleHome.css";
import axios from "axios";
import Card from "../../../base/Card";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../../configs/redux/actions/productsActions";
// import Input from "../../../base/Input/Input";
import { FormatRupiah } from "@arismun/format-rupiah";

const Product = ({ title, subtitle }) => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get(`${process.env.REACT_APP_API_BACKEND}product`)
      .catch((err) => {
        console.log(err);
      });
    dispatch(setProducts(response.data.data));
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="products">
            <h3 className="title">{title}</h3>
            <p>{subtitle}</p>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <Card
                  src={item.photo}
                  to={`/detail/${item.id}`}
                  titleName={item.name}
                  price={<FormatRupiah value={item.price} />}
                  merk={item.merk}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
