
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { getUserData } from "../../store/auth/authSelector";
import { APP_ROUTE } from "../../navigation/routes/appRoutes";
import { setLogout } from "../../store/auth/authReducer";
import { Outlet } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

import "./navbar.css"

const Navbar = () => {
  const user = useSelector(getUserData);
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleNavigate=()=>{
    navigate(APP_ROUTE.homeScreen)
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,cursor:"pointer" }} onClick={handleNavigate} >
            ZBook
          </Typography>
          <div className={user?.isAdmin?"":"nav-links"}>
          {!user?.isAdmin &&

            <NavLink className="nav-link-text" to={APP_ROUTE.myBookings}>
            My Bookings
            </NavLink>
          }
            <IconButton
              sx={{color:"white"}}
              onClick={handleLogout}
            >
              <LogoutIcon 
              sx={{color:"white"}}
              
              />
            </IconButton>
           
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <Outlet />
    </div>
  );
};

export default Navbar;
