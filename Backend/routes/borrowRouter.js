import express from "express";
import {
  borrowedBooks,
  recordBorrowedBooks,
  getBorrowedBooksForAdmin,
  returnBorrowedBooks,
} from "../controllers/borrowControllers.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

const borrowRouter = express.Router();

borrowRouter.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  recordBorrowedBooks
);
borrowRouter.get(
  "/borrowed-books-by-user",
  isAuthenticated,
  isAuthorized("Admin"),
  getBorrowedBooksForAdmin
);
borrowRouter.get("/my-borrowed-books", isAuthenticated, borrowedBooks);

borrowRouter.put(
  "/return-borrowed-book/:bookId",
  isAuthenticated,
  isAuthorized("Admin"),
  returnBorrowedBooks
);
export default borrowRouter;
