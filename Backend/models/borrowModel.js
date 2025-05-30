import mongoose from "mongoose";

export const borrowSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    price: {
      type: Number,
      required: false,
    },
    book: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    },
    borrowDate: {
      type: Date,
      default: Date.now(),
    },
    dueDate: {
      type: Date,
      required: false,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    fine: {
      type: Number,
      default: 0,
    },
    notified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Borrow = mongoose.model("Borrow", borrowSchema);
export default Borrow;
