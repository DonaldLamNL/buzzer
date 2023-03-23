import Home from "./components/Home";
import Login from "./components/Content/User/Login";
import Signup from "./components/Content/User/Signup";
import ForgotPassword from "./components/Content/User/ForgotPassword";
import Hive from "./components/Hive";
import MainContent from "./components/Content/MainContent";
import BuzzSearch from "./components/Content/BuzzSearch";

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
    path: "/userprofile",
    element: <UserProfile />,
  },
  {
    path: "/hive",
    element: <Hive />,
  },
];

export default routerConfig;
