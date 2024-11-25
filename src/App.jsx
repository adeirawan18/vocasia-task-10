import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import EditProfil from './pages/editProfile';
import { ProtectedRoute } from './components/authGuard';
import { useAuthStore } from './store/authStore';
import { useProfileStore } from './store/profileStore';
import { useEffect } from 'react';

function App() {
  const token = useAuthStore((state) => state.token);
  const getProfile = useProfileStore((state) => state.getProfile);
  const reset = useProfileStore((state) => state.reset);

  useEffect(() => {
    if (token) {
      getProfile();
    } else {
      reset();
    }
  }, [token, getProfile, reset]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute isAuthenticated={!!token}>
              <EditProfil />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
