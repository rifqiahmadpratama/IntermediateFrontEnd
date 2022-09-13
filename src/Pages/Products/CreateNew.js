import React from 'react'
import Footer from '../../components/module/home/footer/Footer'
import Navbar from '../../components/module/home/navbar/Navbar'
import CreateProducts from "../../components/module/ActionProduct/CreateProduct";
const CreateNew = () => {
  return (
      <div>
          <Navbar/>
          <CreateProducts />
          <Footer/>
    </div>
  )
}

export default CreateNew;