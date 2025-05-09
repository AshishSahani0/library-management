import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import placeholder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch, useSelector } from "react-redux";
import { addNewAdmin } from "../store/slices/userSlice";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(placeholder);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validateFields = () => {
    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      await dispatch(addNewAdmin(formData)).unwrap();
      toast.success("Admin added successfully!");
      dispatch(toggleAddNewAdminPopup());
    } catch (err) {
      toast.error(err?.message || "Failed to add admin.");
    }
  };

  const getPasswordStrength = () => {
    if (password.length > 10) return "Strong";
    if (password.length >= 6) return "Medium";
    return "Weak";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-2 rounded-lg">
              <img src={keyIcon} alt="Key Icon" className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">Add New Admin</h2>
          </div>
          <button onClick={() => dispatch(toggleAddNewAdminPopup())}>
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <hr className="mb-4" />

        <div className="flex justify-center mb-4">
          <label className="relative cursor-pointer">
            <img
              src={avatarPreview}
              alt="Preview"
              className="w-20 h-20 rounded-full border object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <form onSubmit={handleAddNewAdmin} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Admin's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Admin's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Admin's Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
            <p className={`text-xs mt-1 ${
              getPasswordStrength() === "Strong" ? "text-green-600" : 
              getPasswordStrength() === "Medium" ? "text-yellow-500" : 
              "text-red-500"
            }`}>
              Strength: {getPasswordStrength()}
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => dispatch(toggleAddNewAdminPopup())}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddNewAdmin;
