import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import EmailVerification from "./Pages/EmailVerification";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard";
import LoadingSpiner from "./Pages/LoadingSpiner";
import ForgotPssword from "./Pages/ForgotPssword";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const App = () => {
  const { isCheckingAuth, isAuthenticated, user, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpiner />;

  return (
    <div className="min-h-screen bg-linear-to-tr from-[#0b1f1a] via-[#0f3d2e] to-[#1f7a4a] blur-0 overflow-hidden mx-auto items-center">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPssword/>} />
          <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage/>
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
