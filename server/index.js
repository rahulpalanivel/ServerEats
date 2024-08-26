const express = require("express");
const connectDb = require("./config/dbConnection");

const UserRoutes = require("./routes/User.js");
const FoodRoutes = require("./routes/Food.js");

const cors = require("./middleware/cors");
const errorHandler = require("./middleware/errorHandler.js");
const port = process.env.port || 8000;

const app = express();

app.use(cors);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", UserRoutes);
app.use("/api/food/", FoodRoutes);

// error handler
app.use(errorHandler);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello ",
  });
});

connectDb();
try {
  app.listen(port, () => console.log(`Server Running on port ${port}`));
} catch (error) {
  console.log(error);
}
