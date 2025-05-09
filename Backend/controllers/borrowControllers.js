import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Book } from "../models/bookModel.js";
import User from "../models/userModels.js";
import Borrow from "../models/borrowModel.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import calculateFine from "../utilis/fineCalculator.js";

export const borrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const { borrowedBooks } = req.user;
  res.status(200).json({
    success: true,
    borrowedBooks,
  });
});

export const recordBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;
  const book = await Book.findById(id);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (book.quantity === 0) {
    return next(new ErrorHandler("Book not available", 404));
  }
  const isAlreadyBorrowed = user.borrowedBooks.find(
    (b) => b.bookId.toString() === id && b.return === false
  );
  if (isAlreadyBorrowed) {
    return next(new ErrorHandler("Book already borrowed", 404));
  }
  book.quantity -= 1;
  book.availability = book.quantity > 0;
  await book.save();
  user.borrowedBooks.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowedDate: Date.now(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await user.save();
  await Borrow.create({
    user: { id: user._id, name: user.name, email: user.email },
    book: {
      id: book._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      price: book.price,
    },
  });
  res.status(200).json({
    success: true,
    message: "Book borrowed successfully",
  });
});

export const getBorrowedBooksForAdmin = catchAsyncErrors(
  async (req, res, next) => {
    const borrowedBooks = await Borrow.find();
    res.status(200).json({
      success: true,
      borrowedBooks,
    });
  }
);

export const returnBorrowedBooks = catchAsyncErrors(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const borrowedBook = user.borrowedBooks.find(
    (b) => b.bookId.toString() === bookId && b.return === false
  );
  if (!borrowedBook) {
    return next(new ErrorHandler("Book not borrowed", 404));
  }
  borrowedBook.return = true;
  await user.save();

  book.quantity += 1;
  book.availability = book.quantity > 0;
  await book.save();

  const borrow = await Borrow.findOne({
    "book.id": bookId,
    "user.email": email,
    returnDate: null,
  });
  if (!borrow) {
    return next(new ErrorHandler("Borrow record not found", 404));
  }
  borrow.returnDate = Date.now();
  const fine = calculateFine(borrow.dueDate);
  borrow.fine = fine;
  await borrow.save();
  res.status(200).json({
    success: true,
    message:
      fine !== 0
        ? `Book returned with fine ${fine + book.price}`
        : "Book returned successfully ",
  });
});
