import axios from "axios";
// import { ActionTypes } from "../constants/action-types";
import swal from "sweetalert2";
import { ActionTypes } from "../constants/action-types";

export const loginUser = (dataForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}users/login`,
      dataForm
    );
    const user = result.data.data;
    const role = result.data.data;
    const users = {
      role: result.data.data.role,
      email: result.data.data.email,
    };
    console.log(users);
    const token = result.data.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", role);
    localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: user });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      token: token.data,
      payload: user,
    });
    swal.fire({
      icon: "success",
      title: "Selamat anda berhasil Login",
      text: `Hallo !!`,
    });
    navigate("/home");
  } catch (error) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message,
    });
    console.log(error);
  }
};

export const signUp = (dataForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_PENDING" });
    const result = await axios.post(
      `${process.env.REACT_APP_API_BACKEND}users/register`,
      dataForm
    );
    const user = result.data.data;

    localStorage.setItem("token", user.token);
    localStorage.setItem("refreshToken", user.refreshToken);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
    swal.fire({
      icon: "success",
      title: "Selamat anda berhasil Register",
      text: `Silahkan Login !!`,
    });
    navigate("/login");
  } catch (error) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "data yang anda inputkan salah",
    });
    console.log(error);
  }
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_PRODUCT",
    });

    dispatch({
      type: "SIGN_OUT",
    });
  };
};

export const updateUser = (users) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload: users,
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};

// export const signUp = (navigate,dataForm) => {
//     return async (dispatch) => {

//          try {
//         dispatch({type: 'USER_REGISTER_PENDING'})
//         const result = await axios.post(
//           "http://localhost:4000/v1/auth/register",
//           dataForm
//         );
//         const user = result.data.data
//         console.log(user);
//         dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
//         navigate('/login')

//     } catch (error) {
//         console.log(error);
//     }
//   };
// };
