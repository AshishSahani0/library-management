import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { returnBook } from '../store/slices/borrowSlice';
import { toggleReturnBookPopup } from '../store/slices/popUpSlice'; // make sure this path is correct

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.popup.returnBookPopup);

  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBook({ bookId, email }));
    dispatch(toggleReturnBookPopup());
  };

  if (!showPopup) return null; // <-- only show popup if true

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg md:w-1/3">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Return Book</h3>
          <form onSubmit={handleReturnBook}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="userEmail">User Email</label>
              <input
                type="email"
                id="userEmail"
                placeholder="Borrower's Email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                defaultValue={email}
                required
                disabled
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => dispatch(toggleReturnBookPopup())}
              >
                Return
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPopup;
