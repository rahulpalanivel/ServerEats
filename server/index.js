const express = require("express");
const connectDb = require("./config/dbConnection");
const { Server } = require("socket.io");
const { createServer } = require("http");

const UserRoutes = require("./routes/userRoute.js");
const FoodRoutes = require("./routes/foodRoute.js");
const CartRoutes = require("./routes/cartRoute.js");
const OrdersRoutes = require("./routes/ordersRoute.js");

const cors = require("./middleware/cors");
const errorHandler = require("./middleware/errorHandler.js");
const port = process.env.PORT || 8000;

const app = express();

app.use(cors);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/user/", UserRoutes);
app.use("/api/user/cart/", CartRoutes);
app.use("/api/user/orders/", OrdersRoutes);
app.use("/api/food/", FoodRoutes);

// error handler
app.use(errorHandler);

connectDb();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

try {
  server.listen(port, () => console.log(`Server Running on port ${port}`));
} catch (error) {
  console.log(error);
}
