const Chat = require("../models/Chat");
const User = require("../models/User");

const displayError = require("../middleware/displayError.js");

const getChat = async (req, res, next) => {
  try {
    const { sender, receiver } = req.body;
    if (sender == null || receiver == null) {
      return next(displayError(409, "Fields cannot be empty"));
    }
    const chat = await Chat.findOne({ sender: sender, receiver: receiver });
    if (!chat) {
      const newChat = new Chat({ sender: sender, receiver: receiver });
      const newchat = await newChat.save();
      return res.status(201).json({ newchat });
    }
    return res.status(200).json(chat);
  } catch (err) {
    next(err);
  }
};

const getAllChats = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    const chats = await Chat.find({ sender: user._id }).populate({
      path: "receiver",
      select: "name",
    });
    return res.status(200).json(chats);
  } catch (err) {
    next(err);
  }
};

module.exports = { getChat, getAllChats };
