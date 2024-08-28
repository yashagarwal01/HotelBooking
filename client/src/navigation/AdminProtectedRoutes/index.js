import React from 'react'
import {useSelector} from "react-redux"
import { getUserData, getToken } from "../../store/auth/authSelector";
import { Navigate } from 'react-router-dom';
import { AUTH_ROUTE } from "../routes/authRoutes";



const AdminProtectedRoute = ({children}) => {
  const token = useSelector(getToken);
  const user = useSelector(getUserData);
  const isAuth = token !== ""
  if(isAuth)
  {
    if(user?.isAdmin)
    {
      return children
    }
    else{
        return <Navigate to={AUTH_ROUTE.adminLogin} />
    }
  }
  return <Navigate to={AUTH_ROUTE.adminLogin} />
}

export default AdminProtectedRoute