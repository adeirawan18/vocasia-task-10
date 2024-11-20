import { useAuthStore } from "../store/authStore";

const BASE_API_URL = "http://localhost:8080";

export const login = async ({ email, password }) => {
  const url = `${BASE_API_URL}/api/users/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const createTask = async (title) => {
  const url = `${BASE_API_URL}/api/tasks`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const getAllTask = async () => {
  const url = `${BASE_API_URL}/api/tasks`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const getProfile = async () => {
  const url = `${BASE_API_URL}/api/users/profile`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
  }
};

export const toggleTaskStatus = async (taskId) => {
  const url = `${BASE_API_URL}/api/tasks/${taskId}/done`; // Endpoint sesuai spesifikasi
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Tambahkan jika server membutuhkan
        Authorization: `Bearer ${useAuthStore.getState().token}`, // Pastikan token valid
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling task status:", error.message);
    throw error; // Propagasi error untuk penanganan lebih lanjut
  }
};

export const deleteTask = async (taskId) => {
  const url = `${BASE_API_URL}/api/tasks/${taskId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw error;
  }
};
