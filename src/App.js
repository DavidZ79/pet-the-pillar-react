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
import ShelterListPage from "./pages/ShelterListPage";

import UpdateSeekerPage from "./pages/UpdateSeekerPage";
import UpdateShelterPage from "./pages/UpdateShelterPage";
import PetCreatePage from "./pages/PetCreatePage";
import PetDetailPage from "./pages/PetDetailPage";
import PetUpdatePage from "./pages/PetUpdatePage";
import Shelter from "./pages/Shelter";
import Seeker from "./pages/Seeker";
import ShelterBlog from "./pages/ShelterBlog";
import ApplicationList from "./pages/ApplicationsList";
import SampleBlog from "./pages/SampleBlog";
import BlogManaging from "./pages/BlogManaging";
import PetApplicationPage from "./pages/PetApplicationPage";


import './App.css';
import 'bulma/css/bulma.min.css';


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
      path: "/pet_adoption/:id",
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
      path: "/pet_detail/:id",
      element: <PetDetailPage />,
    },
    {
      path: "/pet_update/:id",
      element: <PetUpdatePage />,
    },
    {
      path: "/seeker/:id",
      element: <Seeker />,
    },
    {
      path: "/shelter/:id",
      element: <Shelter />,
    },
    {
      path: "/shelter_blog/:id",
      element: <ShelterBlog />,
    },
    {
      path: "/applications_list",
      element: <ApplicationList />,
    },
    {
      path: "/sample_blog",
      element: <SampleBlog />,
    },
    {
      path: "/blog_managing/:id",
      element: <BlogManaging />,
    },
    {
      path: "/shelter_list",
      element: <ShelterListPage />,
    },
    {
      path: "/pet_application/:id",
      element: <PetApplicationPage />,
    },
    {
      path: "*",
      element: <FallBack />,
    }
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
