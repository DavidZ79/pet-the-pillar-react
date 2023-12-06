import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FallBack from "./pages/FallBack";
import SearchPage from "./pages/SearchPage";
import SignupBeforePage from "./pages/SignupBeforePage";
import SignupSeekerPage from "./pages/SignupSeekerPage";
import SignupShelterPage from "./pages/SignupShelterPage";
import LoginPage from "./pages/LoginPage";
import Notifications from "./pages/Notifications";
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
      path: "/signup_before",
      element: <SignupBeforePage />,
    },
    {
      path: "/signup_seeker",
      element: <SignupSeekerPage />,
    },
    {
      path: "/signup_shelter",
      element: <SignupShelterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
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
