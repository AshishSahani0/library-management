import {
  addBook,
  getAllBooks,
  deleteBook,
} from "../controllers/bookControllers.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";
import express from "express";

const bookRouter = express.Router();

bookRouter.post("/admin/add", isAuthenticated, isAuthorized("Admin"), addBook);
bookRouter.get("/all", isAuthenticated, getAllBooks);
bookRouter.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Admin"),
  deleteBook
);

export default bookRouter;
