import { lazy } from "react";
import PageLayout from "../layouts/PageLayout";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Team = lazy(() => import("../pages/Team"));
const Properties = lazy(() => import("../pages/Properties"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogDetails = lazy(() => import("../pages/BlogDetails"));
const PropertyDetails = lazy(() => import("../pages/PropertyDetails"));

const publicRoutes = {
  path: "/",
  element: <PageLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "about", element: <About /> },
    { path: "contact", element: <Contact /> },
    { path: "team", element: <Team /> },
    { path: "properties", element: <Properties /> },
    { path: "blogs", element: <Blogs /> },
    { path: "blog/:slug", element: <BlogDetails /> },
    { path: "property/:slug", element: <PropertyDetails /> },
  ],
};

export default publicRoutes;
