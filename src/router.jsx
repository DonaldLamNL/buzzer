import Main from "./components/Main";
import Home from "./components/Home/Home"
import Buzz from "./components/BuzzPage/Buzz"
import BuzzSearch from "./components/Searching/BuzzSearch"
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import ForgotPassword from "./components/User/ForgotPassword";
import UserProfile from "./components/User/UserProfile";
import Hive from "./components/Hive"

const routerConfig = [
  {
    path: "/*",
    element: <Main />,
    children: [
      {
        path: "home/",
        element: <Home />
      },
      {
        path: "buzz",
        element: <Buzz />,
      },
      {
        path: "search",
        element: <BuzzSearch />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/user",
    element: <UserProfile />,
  },
  {
    path: "/hive",
    element: <Hive />,
  },
];

export default routerConfig;
