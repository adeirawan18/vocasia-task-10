import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const EditProfil = () => {
  const { token } = useAuthStore((state) => state); 
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Profil</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData?.name || ""}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Nama Anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData?.email || ""}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Email Anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="photo_url">
              URL Foto
            </label>
            <input
              type="text"
              id="photo_url"
              name="photo_url"
              value={userData?.photo_url || ""}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="URL Foto Profil Anda"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfil;
