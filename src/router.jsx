import Home from "./components/Home";
import User from "./components/User";
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
        element: <MainContent />,
      },
      {
        path: "search",
        element: <BuzzSearch />,
      },
    ],
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/hive",
    element: <Hive />,
  },
];

export default routerConfig;
