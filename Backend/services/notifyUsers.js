import cron from "node-cron";
import { sendEmail } from "../utilis/sendEmail.js";
import Borrow from "../models/borrowModel.js";
import User from "../models/userModels.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * * ", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: {
          $1t: oneDayAgo,
        },
        returnDate: null,
        notified: false,
      });
      for (const element of borrowers) {
        if (element.user && element.user.email) {
          const user = await User.findById(element.user.id);
          sendEmail({
            email: element.user.email,
            subject: "Book Return Reminder",
            message: `Dear ${user.name},\n\nThis is a reminder that the book "${element.book.title}" is due for return. Please return it at your earliest convenience.\n\nThank you!`,
          });
          element.notified = true;
          await element.save();
        }
      }
    } catch (error) {
      console.error("Error sending email notifications:", error);
    }
  });
};
