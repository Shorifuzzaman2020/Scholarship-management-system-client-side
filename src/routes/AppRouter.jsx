
import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Layout/DashboardLayout";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NotFound";

// Auth / Protected Routes
import PrivateRoute from "../components/Shared/PrivateRoute";
import AdminRoute from "../components/Shared/AdminRoute";
import ModeratorRoute from "../components/Shared/ModeratorRoute";

// User Dashboard Pages
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import MyApplications from "../pages/Dashboard/User/MyApplications";
import MyReviews from "../pages/Dashboard/User/MyReviews";

// Moderator Dashboard Pages
import ModeratorDashboard from "../pages/Dashboard/Moderator/ModeratorDashboard";
import ModeratorProfile from "../pages/Dashboard/Moderator/ModeratorProfile";
import AddScholarship from "../pages/Dashboard/Moderator/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Moderator/ManageScholarships";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import AllApplications from "../pages/Dashboard/Moderator/AllApplications";

// Admin Dashboard Pages
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdminAddScholarship from "../pages/Dashboard/Admin/AdminAddScholarship";
import AdminManageScholarship from "../pages/Dashboard/Admin/AdminManageScholarship";
import AdminManageApplication from "../pages/Dashboard/Admin/AdminManageApplication";
import AdminManageReview from "../pages/Dashboard/Admin/AdminManageReview";
import AdminAnalytics from "../pages/Dashboard/Admin/AdminAnalytics";

// Scholarship Routes


import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import ApplyScholarship from "../pages/Apply/ApplyScholarship";
import AnalyticsPage from "../pages/Dashboard/Admin/AnalyticsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/scholarships/:id", element: <PrivateRoute><ScholarshipDetails /></PrivateRoute> },
      { path: "/scholarships", element: <AllScholarships /> },
    ]
  },

  {
    path: "/dashboard/user",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "",
        element: <UserDashboard />, // This now acts as layout
        children: [
          { index: true, element: <UserProfile /> }, // default page
          { path: "profile", element: <UserProfile /> },
          { path: "my-applications", element: <MyApplications /> },
          { path: "my-reviews", element: <MyReviews /> },
          { path: "apply/:id", element: <ApplyScholarship /> },
        ]
      }
    ]
  },

  {
    path: "/dashboard/moderator",
    element: <ModeratorRoute><DashboardLayout /></ModeratorRoute>,
    children: [
      {
        path: "",
        element: <ModeratorDashboard />, // This acts as the layout with <Outlet />
        children: [
          { index: true, element: <ModeratorProfile /> }, // Default page when visiting /dashboard/moderator
          { path: "profile", element: <ModeratorProfile /> },
          { path: "add-scholarship", element: <AddScholarship /> },
          { path: "manage-scholarships", element: <ManageScholarships /> },
          { path: "all-reviews", element: <AllReviews /> },
          { path: "all-applications", element: <AllApplications /> }
        ]
      }
    ]
  },

  {
    path: "/dashboard/admin",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "",
        element: <AdminDashboard />, // This now acts as a layout for nested children
        children: [
          { index: true, element: <AdminProfile /> }, // default route
          { path: "profile", element: <AdminProfile /> },
          { path: "add-scholarship", element: <AdminAddScholarship /> },
          { path: "manage-scholarships", element: <AdminManageScholarship /> },
          { path: "manage-applications", element: <AdminManageApplication /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-reviews", element: <AdminManageReview /> },
          { path: "analytics", element: <AnalyticsPage/> }
        ]
      }
    ]
  },


  // 404
  { path: "*", element: <NotFound /> }
]);

export default router;
