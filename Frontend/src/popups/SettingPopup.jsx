import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import closeIcon from "../assets/close-square.png";
import settingIcon from "../assets/setting.png";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { updatePassword } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const SettingPopup = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please enter all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const data = {
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    };

    const res = await dispatch(updatePassword(data));
    if (res?.success) {
      toast.success("Password updated successfully!");

      // Clear input fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Auto close popup after 2 seconds
      setTimeout(() => {
        dispatch(toggleSettingPopup());
      }, 2000);
    } else {
      toast.error(res?.message || "Password update failed");
    }
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
              <img src={settingIcon} alt="Settings" className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold">Change Credentials</h2>
          </div>
          <button onClick={() => dispatch(toggleSettingPopup())}>
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <hr className="mb-4" />

        <form onSubmit={handleUpdatePassword} className="space-y-3">
          <div>
            <label className="text-sm font-medium">Enter Current Password</label>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Enter New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => dispatch(toggleSettingPopup())}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SettingPopup;
