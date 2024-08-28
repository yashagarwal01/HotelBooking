import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { setSnackbar } from "../../../../store/global/globalReducer";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { user_register, user_login,admin_login } from "../../../../api/auth/auth";
import {setLogin} from "../../../../store/auth/authReducer"
import {APP_ROUTE} from "../../../../navigation/routes/appRoutes"

const DATA = {
  EMAIL: "email",
  USER_NAME: "userName",
  PASSWORD: "password",
};

const DEFAULT_FORM_DATA = {
  [DATA.EMAIL]: "",
  [DATA.USER_NAME]: "",
  [DATA.PASSWORD]: "",
};

const checkValidation = (value) => {
  const email = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  const error = {
    [DATA.PASSWORD]: "",
    [DATA.EMAIL]: "",
    [DATA.USER_NAME]: "",
  };
  console.log(email.test(value[DATA.EMAIL]));
  let isError = false;
  if (value[DATA.PASSWORD].length < 5) {
    error[DATA.PASSWORD] = "Password is too small";
    isError = true;
  }
  if (!email.test(value[DATA.EMAIL])) {
    error[DATA.EMAIL] = "Invalid Email";
    isError = true;
  }
  return { error, isError };
};

const Form = (props) => {
  const { pageType = "login",setPageType,isAdmin=false } = props;
  const [isloading, setIsLoading] = useState(false);
  const [value, setValue] = useState(
    DEFAULT_FORM_DATA
  );
  const [validation, setValidation] = useState(DEFAULT_FORM_DATA);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isLoginPage = pageType === "login";

  useEffect(() => {
    setValidation(DEFAULT_FORM_DATA);
    setValue(DEFAULT_FORM_DATA);
  }, [pageType]);

  const handleRegistration = async (values) => {
    try {
      const response = await user_register(values);
      setValue(DEFAULT_FORM_DATA);
      setPageType("login")
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data?.message,
            severity: "success",
          },
        })
      );
    } catch (err) {
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
          },
        })
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async (values) => {
    try {
      let response
      if(isAdmin){
      response = await admin_login(values);
      }
      else{
      response = await user_login(values);

      }
      setValue(DEFAULT_FORM_DATA);
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: response?.data?.message,
            severity: "success",
          },
        })
      );
      dispatch(
        setLogin({
          user: isAdmin?response?.data.admin:response?.data.user,
          token: response?.data.token,
        })
      );
      navigate(isAdmin?APP_ROUTE.dashBoard:APP_ROUTE.homeScreen)
    } catch (err) {
      console.log(err)
      dispatch(
        setSnackbar({
          snackbar: {
            open: true,
            message: err?.response?.data?.message,
            severity: "error",
          },
        })
      );
    } finally {
      setIsLoading(false);
    } 
  };

  const handleChange = (type) => (e) => {
    setValue({ ...value, [type]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (pageType === "login") {
      setIsLoading(true);
      handleLogin(value)
    } else {
      const { error, isError } = checkValidation(value);
      if (isError) {
        setValidation(error);
      } else {
        setValidation(DEFAULT_FORM_DATA);
        setIsLoading(true);
        handleRegistration(value);
      }
    }
  };
  return (
    <form onSubmit={handleFormSubmit} className="login-box-form">
      <Typography
        textAlign="center"
        sx={{ fontSize: { xs: "30px", sm: "40px" }, mb: 3 }}
        color="primary"
      >
        {isAdmin?"Admin Login":isLoginPage ? "Sign In" : "Sign Up"}
      </Typography>
      {!isLoginPage && (
        <TextField
          name="userName"
          onChange={handleChange(DATA.USER_NAME)}
          value={value[DATA.USER_NAME]}
          required
          label="User Name"
          sx={{ mb: 2 }}
          helperText={validation[DATA.USER_NAME]}
          error={validation[DATA.USER_NAME] !== ""}
          placeholder="Enter Your User Name"
        />
      )}
      <TextField
        onChange={handleChange(DATA.EMAIL)}
        value={value[DATA.EMAIL]}
        name="email"
        required
        label="Email Address"
        sx={{ mb: 2 }}
        helperText={validation[DATA.EMAIL]}
        error={validation[DATA.EMAIL] !== ""}
        placeholder="Enter Your Email"
      />
      <TextField
        name="password"
        required
        label="Password"
        type="password"
        onChange={handleChange(DATA.PASSWORD)}
        value={value[DATA.PASSWORD]}
        helperText={validation[DATA.PASSWORD]}
        error={validation[DATA.PASSWORD] !== ""}
        placeholder="Enter Your Password"
        sx={{ mb: 1 }}
      />
      <Button
        disabled={isloading}
        type="submit"
        variant="contained"
        sx={{ mt: 4 }}
      >
        {isLoginPage ? "login" : "register"}
      </Button>
    </form>
  );
};

export default Form;
