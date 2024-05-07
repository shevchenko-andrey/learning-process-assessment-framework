import Layout from "components/Layout";
import ProtectedRoute from "components/ProtectedRoute";
import RoleGuard from "components/RoleGuard";
import { createBrowserRouter } from "react-router-dom";
import { ApplicationRole } from "types/Auth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TeacherTestsPage from "./pages/TeacherTestsPage";
import UsersPage from "./pages/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        )
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <RoleGuard roles={[ApplicationRole.ADMIN]}>
              <UsersPage />
            </RoleGuard>
          </ProtectedRoute>
        )
      },
      {
        path: "/teacher/tests",
        element: (
          <ProtectedRoute>
            <RoleGuard roles={[ApplicationRole.TEACHER, ApplicationRole.ADMIN]}>
              <TeacherTestsPage />
            </RoleGuard>
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

export default router;
