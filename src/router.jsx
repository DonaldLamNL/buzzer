/*
  This file is the global control of the router
*/
import Main from "./components/Main";
import Home from "./components/Home/Home";
import Buzz from "./components/BuzzPage/Buzz";
import BuzzSearch from "./components/Searching/BuzzSearch";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import UserProfile from "./components/User/UserProfile";
import Hive from "./components/Hive";
import { Navigate } from "react-router-dom";

const routerConfig = (isLogin) => {
  return [
    {
      path: "/*",
      element: isLogin ? <Main /> : <Navigate to="/login" />,
      children: [
        {
          path: "home/",
          element: isLogin ? <Home /> : null,
        },

        {
          path: "buzz",
          element: isLogin ? <Buzz /> : null,
        },
        {
          path: "search",
          element: isLogin ? <BuzzSearch /> : null,
        },
      ],
    },

    {
      path: "/login",
      element: isLogin ? <Navigate to="/home" /> : <Login />,
    },
    {
      path: "/signup",
      element: isLogin ? <Navigate to="/home" /> : <Signup />,
    },
    {
      path: "/forgotpassword",
      element: isLogin ? <Navigate to="/home" /> : <ForgotPassword />,
    },
    {
      path: "/resetpassword",
      element: isLogin ? <ResetPassword /> : <Navigate to="/login" />,
    },
    {
      path: "/user",
      element: isLogin ? <UserProfile /> : <Navigate to="/login" />,
    },
    {
      path: "/hive",
      element: isLogin ? <Hive /> : <Navigate to="/login" />,
    },
  ];
};

export default routerConfig;
