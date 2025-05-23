import React, { useEffect, useState } from "react";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState(books?.length || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const numberofUsers = users?.filter((u) => u.role === "User") || [];
    const numberofAdmins = users?.filter((u) => u.role === "Admin") || [];
    setTotalUsers(numberofUsers.length);
    setTotalAdmin(numberofAdmins.length);

    const borrowed = allBorrowedBooks?.filter((b) => b.returnDate === null) || [];
    const returned = allBorrowedBooks?.filter((b) => b.returnDate !== null) || [];
    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);
  }, [users, allBorrowedBooks]);

  const pieData = {
    labels: ["Borrowed Books", "Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3B82F6", "#10B981"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-6 pt-28 bg-gray-100 min-h-screen">
      <Header />
      <div className="flex flex-col xl:flex-row gap-10">
        {/* LEFT: Chart and legend */}
        <div className="xl:w-1/2 flex flex-col items-center gap-6">
          <div className="w-full max-w-md">
            <Pie data={pieData} />
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
              <p>Borrowed</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <p>Returned</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Stats and profile */}
        <div className="xl:w-1/2 flex flex-col gap-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Users */}
            <StatCard icon={usersIcon} count={totalUsers} label="Total User Base" />
            {/* Books */}
            <StatCard icon={bookIcon} count={totalBooks} label="Total Books Count" />
            {/* Admins */}
            <StatCard icon={adminIcon} count={totalAdmin} label="Total Admin Count" />
          </div>

          {/* Profile */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <img
              src={user?.avatar?.url || "/default-avatar.png"}
              onError={(e) => (e.target.src = "/default-avatar.png")}
              alt="Admin Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold mt-3">{user?.name || "Admin"}</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Welcome to your admin dashboard. Here you can manage settings and monitor the
              library system statistics. Reach out to us if you need any help.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

const StatCard = ({ icon, count, label }) => (
  <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4">
    <div className="bg-gray-200 w-16 h-16 flex justify-center items-center rounded-md">
      <img src={icon} alt="icon" className="w-8 h-8" />
    </div>
    <div className="flex flex-col items-start">
      <h4 className="text-3xl font-bold">{count}</h4>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  </div>
);

export default AdminDashboard;
