const express = require("express");
const connectDb = require("./config/dbConnection");
const { Server } = require("socket.io");

const UserRoutes = require("./routes/userRoute.js");
const FoodRoutes = require("./routes/foodRoute.js");
const CartRoutes = require("./routes/cartRoute.js");
const OrdersRoutes = require("./routes/ordersRoute.js");
const ChatRoutes = require("./routes/chatRoute.js");
const MessageRoutes = require("./routes/messageRoute.js");

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
app.use("/api/chat/", ChatRoutes);
app.use("/api/chat/message", MessageRoutes);

// error handler
app.use(errorHandler);

connectDb();

const server = app.listen(port, () =>
  console.log(`Server Running on port ${port}`)
);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  //console.log("Connected to socket");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User Connected: " + userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room " + room);
    console.log(" ");
  });

  socket.on("new message", (chat, message) => {
    socket.in(chat.sender).emit("message received", message);
    socket.in(chat.receiver).emit("message received", message);
  });
});
