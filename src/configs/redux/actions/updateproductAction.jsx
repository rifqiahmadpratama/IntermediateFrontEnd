import axios from "axios";
const updateProduct = (data, id, saveImage, setShow) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("photo", saveImage);
    formData.append("description", data.description);
    formData.append("category_id", data.category_id);
    formData.append("transaksi_id", data.transaksi_id);
    const products = await axios.put(
      process.env.REACT_APP_API_BACKEND + "product/" + id,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(products);
    alert("update product successful");
    setShow(false);
    const result = products.data.data;
    dispatch({ type: "UPDATE_PRODUCT", payload: result });
  } catch (err) {
    console.error(err.message);
    alert("update product failed");
    setShow(false);
  }
};

export default updateProduct;
