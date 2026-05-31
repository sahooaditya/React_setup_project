import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import BuyNow from "../pages/BuyNow";
import Cart from "../pages/Cart";
import Service from "../pages/Service";
import Product from "../pages/Product";
import ProductDetails from "../pages/Product/ProductDetails";
import ProductList from "../pages/Product/ProductList";

/* LAZY PAGES */

const Login = lazy(() => import("../pages/Login"));

const Homes = lazy(() => import("../pages/Homes"));
const About = lazy(() => import("../pages/About"));

const Company = lazy(() => import("../pages/About/Company"));
const Team = lazy(() => import("../pages/About/Team"));

const AdminDashboard = lazy(() => import("../pages/DashboardAdmin/AdminDashboard/AdminDashboard"));

const Users = lazy(() => import("../pages/DashboardAdmin/Users"));

const Setting = lazy(() => import("../pages/DashboardAdmin/Settings"));

const UserData = lazy(() => import("../pages/DashboardUser/UserData"));

const Profile = lazy(() => import("../pages/DashboardUser/Profile"));

const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}

      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <MainLayout>
            <Homes />
          </MainLayout>
        }
      />

      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />

      <Route
        path="/about/company"
        element={
          <MainLayout>
            <Company />
          </MainLayout>
        }
      />

      <Route
        path="/about/team"
        element={
          <MainLayout>
            <Team />
          </MainLayout>
        }
      />
      <Route
        path="/service"
        element={
          <MainLayout>
            <Service />
          </MainLayout>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Product />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:categoryId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductList />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/details/:productId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Cart />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/buy-now"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BuyNow />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/buy-now/:productId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BuyNow />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin/users"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Setting />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* USER */}

      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <UserData />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/user/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ERROR */}

      <Route
        path="*"
        element={
          <MainLayout>
            <ErrorPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
