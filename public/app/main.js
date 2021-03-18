axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "JWT"
)}`;

const getCurrentUser = async () => {
  try {
    if (localStorage.getItem("JWT")) {
      const res = await axios.get("auth/profile");
      return res.data;
    } else return null;
  } catch (e) {
    console.error(e);
  }
};

const logout = () => {
  localStorage.removeItem("JWT");
  location.href = "login";
};
