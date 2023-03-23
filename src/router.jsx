import Home from "./components/Main";
import MainContent from "./components/Home/Home"
import Buzz from "./components/BuzzPage/Buzz"
import BuzzSearch from "./components/Searching/BuzzSearch"
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import ForgotPassword from "./components/User/ForgotPassword";
import Hive from "./components/Hive"


const routerConfig = [
  {
    path: "/*",
    element: <Home />,
    children: [
      {
        path: "home",
        element: <MainContent />
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
    path: "/hive",
    element: <Hive />,
  },
];

export default routerConfig;
