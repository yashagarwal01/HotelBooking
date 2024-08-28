import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { AUTH_ROUTE } from "./navigation/routes/authRoutes";
import { APP_ROUTE } from "./navigation/routes/appRoutes";
import UserLogin from "./pages/Login/UserLogin";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import UnprotectedRoutes from "./navigation/UnprotectedRoutes";
import UserProtectedRoutes from "./navigation/UserProtectedRoutes";
import AdminProtectedRoutes from "./navigation/AdminProtectedRoutes";
import CustomSnackbar from "./components/CustomSnackBar";
import AdminLogin from "./pages/Login/Admin";
const HomeScreen = React.lazy(() => import("./pages/HomeScreen"));
const HotelSearch = React.lazy(() => import("./pages/HotelSearch"));
const BookHotel = React.lazy(() => import("./pages/BookHotel"));
const MyBooking = React.lazy(() => import("./pages/MyBooking"));
const DashBoard = React.lazy(() => import("./pages/Admin/DashBoard"));

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#d2164d",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route
            path={AUTH_ROUTE.userLogin}
            element={
              <UnprotectedRoutes>
                <UserLogin />
              </UnprotectedRoutes>
            }
          />
          <Route
            path={AUTH_ROUTE.adminLogin}
            element={
              <UnprotectedRoutes>
                <AdminLogin />
              </UnprotectedRoutes>
            }
          />

          <Route element={<Navbar />}>
            <Route
              path={APP_ROUTE.homeScreen}
              element={
                <UserProtectedRoutes>
                  <Suspense fallback={<Loader />}>
                    <HomeScreen />
                  </Suspense>
                </UserProtectedRoutes>
              }
            />
            <Route
              path={APP_ROUTE.searchHotel}
              element={
                <UserProtectedRoutes>
                  <Suspense fallback={<Loader />}>
                    <HotelSearch />
                  </Suspense>
                </UserProtectedRoutes>
              }
            />
            <Route
              path={APP_ROUTE.bookHotel}
              element={
                <UserProtectedRoutes>
                  <Suspense fallback={<Loader />}>
                    <BookHotel />
                  </Suspense>
                </UserProtectedRoutes>
              }
            />
            <Route
              path={APP_ROUTE.myBookings}
              element={
                <UserProtectedRoutes>
                  <Suspense fallback={<Loader />}>
                    <MyBooking />
                  </Suspense>
                </UserProtectedRoutes>
              }
            />
            <Route
              path={APP_ROUTE.dashBoard}
              element={
                <AdminProtectedRoutes>
                  <Suspense fallback={<Loader />}>
                    <DashBoard />
                  </Suspense>
                </AdminProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <CustomSnackbar />
    </ThemeProvider>
  );
};

export default App;
