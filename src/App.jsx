import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage";
import Navigation from "./components/Navagation";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <MainPage />
        </>
      ),
    },
  ]);
  return (
    <>
      <Navigation />
      <RouterProvider router={router} />
    </>
  );
}
