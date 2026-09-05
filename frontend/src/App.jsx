
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import CatalogPage from "./pages/CatalogPage";
import PublishProductPage from "./pages/PublishProductPage";
import EditProductPage from "./pages/EditProductPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function AppRouter() {
  const { estaAutenticado } = useAuth();

  if (!estaAutenticado) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/productos" replace />} />
          
          <Route path="productos" element={<CatalogPage />} />
          <Route path="productos/editar/:id" element={<EditProductPage />} />
          <Route path="publicar" element={<PublishProductPage />} />
          <Route path="perfil" element={<ProfilePage />} />

          <Route path="*" element={<Navigate to="/productos" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
