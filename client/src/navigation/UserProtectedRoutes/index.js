import React from 'react'
import {useSelector} from "react-redux"
import { getUserData, getToken } from "../../store/auth/authSelector";
import { Navigate } from 'react-router-dom';
import { AUTH_ROUTE } from "../routes/authRoutes";


const UserProtectedRoute = ({children}) => {
  const token = useSelector(getToken);
  const user = useSelector(getUserData);
  const isAuth = token !== ""
  if(isAuth)
  {
    if(user?.isAdmin)
    {
      return <Navigate to={AUTH_ROUTE.adminLogin} />
    }
    else{
        return children
    }
  }
  return <Navigate to={AUTH_ROUTE.userLogin} />
}

export default UserProtectedRoute