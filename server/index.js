const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const config = require("./config");
const Rental = require("./models/rental");
const FakeDb = require("./fake-db");
const rentalRoutes = require("./routes/rentals");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const paymentRoutes = require("./routes/payments");
const reviewRoutes = require("./routes/reviews");
const imageUploadRoutes = require("./routes/image-upload");

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  if (process.env.NODE_ENV !== "production") {
    const fakeDb = new FakeDb();
    // fakeDb.pushDataToDb();
  }
});
mongoose.set("useCreateIndex", true); //prevent warning

const app = express();
app.use(bodyParser.json());
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1", imageUploadRoutes);
if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "build");
  app.use(express.static(appPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || "3001";
app.listen(PORT, () => {
  console.log("I'm running on port", PORT);
});
