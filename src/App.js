// import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FallBack from "./pages/FallBack";
import SearchPage from "./pages/SearchPage";
import SignupBeforePage from "./pages/SignupBeforePage";
import SignupSeekerPage from "./pages/SignupSeekerPage";
import SignupShelterPage from "./pages/SignupShelterPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import ShelterDashboardPage from "./shelter_dashboard_page/ShelterDashboardPage";
import PetAdoption from "./pages/PetAdoptionPage";

import UpdateSeekerPage from "./pages/UpdateSeekerPage";
import UpdateShelterPage from "./pages/UpdateShelterPage";
import PetCreatePage from "./pages/PetCreatePage";
import PetApplicationPage from "./pages/PetApplicationPage";
import PetDetailPage from "./pages/PetDetailPage";
import PetUpdatePage from "./pages/PetUpdatePage";
import Shelter from "./pages/Shelter";
import ShelterBlog from "./pages/ShelterBlog";


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
      path: "/notification_page",
      element: <NotificationPage />,
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
    {
      path: "/shelter_dashboard",
      element: <ShelterDashboardPage />,
    },
    {
      path: "/pet_adoption",
      element: <PetAdoption />,
    },
    {
      path: "/update_shelter",
      element: <UpdateShelterPage />,
    },
    {
      path: "/update_seeker",
      element: <UpdateSeekerPage />,
    },
    {
      path: "/pet_create",
      element: <PetCreatePage />,
    },
    {
      path: "/pet_application",
      element: <PetApplicationPage />,
    },
    {
      path: "/pet_detail",
      element: <PetDetailPage />,
    },
    {
      path: "/pet_update",
      element: <PetUpdatePage />,
    },
    {
      path: "/shelter",
      element: <Shelter />,
    },
    {
      path: "/shelter_blog",
      element: <ShelterBlog />,
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
