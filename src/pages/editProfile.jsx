import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfil = () => {
  const { token } = useAuthStore((state) => state);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data profil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "/api/users/profile",
        {
          name: userData.name,
          email: userData.email,
          photo_url: userData.photo_url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-primary mb-4">Edit Profil</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-left text-base-content mb-2" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData?.name || ""}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-gray-100 text-base-content p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Anda"
            />
          </div>
          <div className="mb-6">
            <label className="block text-left text-base-content mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData?.email || ""}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-gray-100 text-base-content p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Anda"
            />
          </div>
          <div className="mb-6">
            <label className="block text-left text-base-content mb-2" htmlFor="photo_url">
              URL Foto
            </label>
            <input
              type="text"
              id="photo_url"
              name="photo_url"
              value={userData?.photo_url || ""}
              onChange={handleInputChange}
              className="input input-bordered w-full bg-gray-100 text-base-content p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="URL Foto Profil Anda"
            />
          </div>
          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={handleGoBack}
              className="btn btn-primary w-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="btn btn-primary w-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfil;
