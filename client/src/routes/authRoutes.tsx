import { lazy } from "react";
import LogoutReq from "../protected_routes/LogoutReq";
import LoginReq from "../protected_routes/LoginReq";
import PageLayout from "../layouts/PageLayout";

const SignUp = lazy(() => import("../pages/SignUp"));
const SignIn = lazy(() => import("../pages/SignIn"));
const VerifyOTP = lazy(() => import("../pages/VerifyOTP"));
const SavedProperties = lazy(() => import("../pages/SavedProperties"));
const EnterEmailPassReset = lazy(() => import("../pages/EnterEmailPassReset"));
const PasswordReset = lazy(() => import("../pages/PasswordReset"));

const authRoutes = {
  path: "/",
  element: <PageLayout />,
  children: [
    { path: "sign-up", element: <LogoutReq><SignUp /></LogoutReq> },
    { path: "sign-in", element: <LogoutReq><SignIn /></LogoutReq> },
    { path: "verify-otp", element: <VerifyOTP /> },
    { path: "saved-properties", element: <LoginReq><SavedProperties /></LoginReq> },
    { path: "enter-email-password-reset", element: <EnterEmailPassReset /> },
    { path: "password-reset", element: <PasswordReset /> },
  ],
};

export default authRoutes;
