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

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
  if (process.env.NODE_ENV !== "production") {
    const fakeDb = new FakeDb();
    //fakeDb.pushDataToDb();
  }
});
mongoose.set("useCreateIndex", true); //prevent warning

const app = express();
app.use(bodyParser.json());
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "build");
  app.use(express.static(appPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.port || "3001";
app.listen("3001", () => {
  console.log("I'm running on port", PORT);
});
