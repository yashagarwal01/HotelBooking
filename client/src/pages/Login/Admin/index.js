import { Typography, Box } from "@mui/material";
import "../login.css";
import Form from "../miniComponent/Form";

const AdminLogin = () => {
 
  return (
    <div className="login-container">
      <Box boxShadow={3} className="login-box">
        <Form isAdmin={true} />
       
      </Box>
    </div>
  );
};

export default AdminLogin;