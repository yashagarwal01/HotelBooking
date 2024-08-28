import { Typography, Box } from "@mui/material";
import { useState } from "react";
import "../login.css";


import Form from "../miniComponent/Form";

const UserLogin = () => {
 
  const [pageType, setPageType] = useState("login");
  const handlePageType = () => {
    if (pageType === "login") {
      setPageType("register");
    } else {
      setPageType("login");
    }
  };

  return (
    <div className="login-container">
      <Box boxShadow={3} className="login-box">
        <Form pageType={pageType} setPageType={setPageType} />
        {pageType === "login" ? (
          <div className="login-box-typography" >
          <Typography variant="body2"   >Don't Have Account , Click Here to <span className="login-box-button" onClick={handlePageType} >Sign Up</span> </Typography>
          </div>
        ) : (
          <div className="login-box-typography" >
          <Typography variant="body2"  >Already Have Account , Click Here to <span className="login-box-button" onClick={handlePageType}>Sign In</span> </Typography>
          </div>
        )}
      </Box>
    </div>
  );
};

export default UserLogin;

