import Main from "./components/Main";
import Home from "./components/Home/Home";
import Buzz from "./components/BuzzPage/Buzz";
import BuzzSearch from "./components/Searching/BuzzSearch";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import UserProfile from "./components/User/UserProfile";
import EditProfile from "./components/User/EditProfile";
import Hive from "./components/Hive";

const routerConfig = (isLogin) => {
  return [
    {
      path: "/*",
      element: isLogin ? <Main /> : <Login />,
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
      element: <Login />,
    },
    {
      path: "/signup",
      element: isLogin ? <Signup /> : <Login />,
    },
    {
      path: "/forgotpassword",
      element: isLogin ? <ForgotPassword /> : <Login />,
    },
    {
      path: "/resetpassword",
      element: isLogin ? <ResetPassword /> : <Login />,
    },
    {
      path: "/user",
      element: isLogin ? <UserProfile /> : <Login />,
    },
    {
      path: "/edit",
      element: isLogin ? <EditProfile /> : <Login />,
    },
    {
      path: "/hive",
      element: isLogin ? <Hive /> : <Login />,
    },
  ];
};

export default routerConfig;
