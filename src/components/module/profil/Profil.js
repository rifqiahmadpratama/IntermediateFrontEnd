import React, { useEffect, useState } from "react";
import "./profil.css";
import profil from "../../../assets/image/profilBig.png";
import home from "../../../assets/image/seling-product/home (2) 1.png";
import vektor from "../../../assets/image/seling-product/Vector (2).png";
import avatar from "../../../assets/image/edit-avatar.png";
import pekage from "../../../assets/image/seling-product/package 1.png";
import shoping from "../../../assets/image/seling-product/shopping-cart (3) 1.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Profil = ({
  titleTwo,

  imgTwo,

  children,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [date_of_brith, setDate_of_brith] = useState("");
  useEffect(() => {
    datas();
  }, []);

  const datas = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_API_BACKEND}profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data.data.username);
    setDate_of_brith(response.data.data[0].date_of_brith);
  };
  console.log(user);
  return (
    <div className="card mt-3">
      <div className="card body">
        <div className="profil-select mt-5">
          <ul className="list-unstyled ps-0 mt-2">
            <li className="mb-1 mt-3">
              <img
                className="rounded-circle"
                width={75}
                height={70}
                src={date_of_brith ? date_of_brith : profil}
                alt="img"
              />
            </li>

            <li className="mb-1 mt-3">
              <button className="btn btn-location">
                <img src={imgTwo} alt="" />
              </button>
              <Link to="/productList">
                <button
                  className="btn btn-toggle title-dashboard d-inline-flex align-items-center rounded border-0 collapsed text-secondary"
                  data-bs-toggle="collapse"
                  data-bs-target="#dashboard-collapse"
                  aria-expanded="true"
                >
                  <span className="text-profil">{titleTwo}</span>
                </button>
              </Link>
              <img src={vektor} className="img-down ms-4" alt="" />
              <div className="collapse show" id="dashboard-collapse">
                {children}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

Profil.defaultProps = {
  titleOne: "Store",
  titleTwo: "Products",
  titleThere: "Orders",
  imgOne: home,
  imgTwo: pekage,
  imgTheree: shoping,
};
export default Profil;
