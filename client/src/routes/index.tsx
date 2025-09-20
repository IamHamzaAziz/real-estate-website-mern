import publicRoutes from "./publicRoutes";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import { Navigate } from "react-router-dom";

const routes = [
  publicRoutes,
  authRoutes,
  adminRoutes,
  { path: "*", element: <Navigate to="/" replace /> },
];

export default routes;
