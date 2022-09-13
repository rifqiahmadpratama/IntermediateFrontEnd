import React from 'react'
// import CreateProduct from '../components/form/CreateProduct'
import Footer from '../components/module/home/footer/Footer'
import Navbar from "../components/module/home/navbar/Navbar";
import ProductList from './Products/ProductList'

const SellingProduct = () => {
  return (
    <div>
      <Navbar />
      <ProductList />
      <Footer />
    </div>
  );
}

export default SellingProduct