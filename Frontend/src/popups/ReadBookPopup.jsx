import React from "react";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import { useDispatch } from "react-redux";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <div className="w-11/12 bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">View Book Info</h2>
          <button
            className="text-white text-lg font-bold"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Book Title
            </label>
            <div className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book && book.title}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Author</label>
            <div className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book && book.author}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <div className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100">
              {book && book.description}
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 bg-gray-100 rounded-b-lg">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            type="button"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;