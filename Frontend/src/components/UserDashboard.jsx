import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

import Header from "../layout/Header";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import logo from "../assets/black-logo.png";

// Register all necessary ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  LineElement,
  PointElement
);

const UserDashboard = () => {
  const { userBorrowedBooks = [] } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter((book) => !book.returned);
    const returned = userBorrowedBooks.filter((book) => book.returned);
    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#000",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />

        <div className="flex flex-col-reverse xl:flex-row gap-8">
          {/* Left Section */}
          <div className="flex flex-col gap-7 flex-[4] xl:min-h-[85.5vh]">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col lg:flex-row gap-7">
                <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] rounded-lg hover:shadow-inner transition">
                  <span className="w-[2px] bg-black h-20"></span>
                  <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <img src={bookIcon} alt="book-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Your Borrowed Book List</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] rounded-lg hover:shadow-inner transition">
                  <span className="w-[2px] bg-black h-20"></span>
                  <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <img src={returnIcon} alt="return-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Your Returned Book List</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-7">
                <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] rounded-lg hover:shadow-inner transition">
                  <span className="w-[2px] bg-black h-20"></span>
                  <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                    <img src={browseIcon} alt="browse-icon" className="w-8 h-8" />
                  </span>
                  <p className="text-lg xl:text-xl font-semibold">Let’s Browse Books Inventory</p>
                </div>
                <img
                  src={logo_with_title}
                  alt="logo"
                  className="hidden lg:block w-auto max-h-[100px] object-contain"
                />
              </div>
            </div>

            <div className="bg-white p-7 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold relative flex justify-center items-center rounded-2xl">
              <h4>Welcome to Your Dashboard</h4>
              <p className="text-gray-700 text-sm sm:text-lg absolute right-8 bottom-3">
                ~Library Management Team
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col flex-[2] gap-7 justify-between py-5">
            <div className="w-full">
              {totalBorrowedBooks + totalReturnedBooks === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                  No borrowed books data available.
                </p>
              ) : (
                <Pie data={data} options={options} className="w-full h-auto" />
              )}
            </div>

            <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-full gap-5 min-h-[150px] bg-white rounded-lg">
              <img src={logo} alt="logo" className="h-12 xl:h-20 w-auto" />
              <span className="w-[2px] bg-black h-full"></span>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
                  <span>Total Borrowed Books</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
                  <span>Total Returned Books</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserDashboard;
