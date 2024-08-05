import "./App.css"
import '@fontsource/josefin-sans/300.css';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/500.css';
import '@fontsource/josefin-sans/700.css';

import { ThemeProvider } from '@emotion/react';
import { muiTheme } from "./MUI/theme"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { baseUrl } from "./core";
import { login, logout } from "./redux/user";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import SplashScreen from "./pages/SplashScreen";
import SignUp from "./pages/Signup";

const App = () => {

  const currentUser = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return () => {
      // cleanup function
    };

  }, [])

  useEffect(() => {

    const checkLoginStatus = async () => {
      try {
        const resp = await axios.get(`${baseUrl}/api/v1/profile`, {
          withCredentials: true,
        });
        console.log(resp)
        dispatch(login(resp?.data?.data));
      } catch (error: any) {
        console.error(error);
        dispatch(logout());
      }
    };

    checkLoginStatus();

    return () => {
      // cleanup function
    };

  }, []);

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <>

          <>
            {
              currentUser?.isLogin == true && currentUser?.isAdmin == false && (
                <>
                  <Routes>
                    {/* <Route path="/" element={<Home />} /> */}
                    <Route path="*" element={<Navigate to="/" replace={true} />} />
                  </Routes>
                </>
              )
            }
          </>

          <>
            {
              currentUser?.isLogin == true && currentUser?.isAdmin == true && (
                <>
                  <Routes>

                  </Routes>
                </>
              )
            }
          </>

          <>
            {
              currentUser?.isLogin == false && (
                <>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/login" replace={true} />} />
                  </Routes>
                </>
              )
            }
          </>

          <>
            {
              currentUser?.isLogin == null && (
                <>
                  <SplashScreen />
                </>
              )
            }
          </>

        </>
      </ThemeProvider>
    </>
  )
}

export default App