import React from 'react'
import {useSelector} from "react-redux"
import { getUserData, getToken } from "../../store/auth/authSelector";
import { Navigate } from 'react-router-dom';
import { APP_ROUTE } from '../routes/appRoutes';

const UnprotectedRoute = ({children}) => {
  const token = useSelector(getToken);
  const user = useSelector(getUserData);
  const isAuth = token !== ""
  if(isAuth)
  {
    if(user?.isAdmin)
    {
        return <Navigate to={APP_ROUTE.dashBoard} />
    }
    else{
        return <Navigate to={APP_ROUTE.homeScreen} />
    }
  }
  return children
}

export default UnprotectedRoute
