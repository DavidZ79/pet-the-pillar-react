// import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FallBack from "./pages/FallBack";
import SearchPage from "./pages/SearchPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Notifications from "./pages/Notifications";
import SignupSeeker from "./pages/SignupSeeker";
import SignupShelter from "./pages/SignupShelter";

import './App.css';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/notifications",
      element: <Notifications />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup_seeker",
      element: <SignupSeeker />,
    },
    {
      path: "/signup_shelter",
      element: <SignupShelter />,
    },
  ]);

  return (
    <RouterProvider
    router={router}
    fallbackElement={<FallBack />}
  />
  );
}

export default App;
