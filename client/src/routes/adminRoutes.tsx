import { lazy } from "react";
import OnlyAdmin from "../protected_routes/OnlyAdmin";
import PageLayout from "../layouts/PageLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const AddBlog = lazy(() => import("../pages/admin/AddBlog"));
const AddProperty = lazy(() => import("../pages/admin/AddProperty"));
const ContactMessages = lazy(() => import("../pages/admin/ContactMessages"));
const ManageBlogs = lazy(() => import("../pages/admin/ManageBlogs"));
const ManageProperties = lazy(() => import("../pages/admin/ManageProperties"));
const UpdateProperty = lazy(() => import("../pages/admin/UpdateProperty"));
const UpdateBlog = lazy(() => import("../pages/admin/UpdateBlog"));
const ManageUsers = lazy(() => import("../pages/admin/ManageUsers"));

const adminRoutes = {
  path: "/",
  element: <PageLayout />,
  children: [
    {
      path: "admin",
      element: (
        <OnlyAdmin>
          <AdminDashboardLayout />
        </OnlyAdmin>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "add-blog", element: <AddBlog /> },
        { path: "add-property", element: <AddProperty /> },
        { path: "contact-messages", element: <ContactMessages /> },
        { path: "manage-blogs", element: <ManageBlogs /> },
        { path: "manage-properties", element: <ManageProperties /> },
        { path: "update-property/:slug", element: <UpdateProperty /> },
        { path: "update-blog/:slug", element: <UpdateBlog /> },
        { path: "manage-users", element: <ManageUsers /> },
      ],
    },
  ],
};

export default adminRoutes;
