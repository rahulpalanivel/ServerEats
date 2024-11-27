const Message = require("../models/Message");
const displayError = require("../middleware/displayError");

const newMessage = async (req, res, next) => {
  try {
    const { chat, sender, content } = req.body;
    const message = await Message.create({
      chat: chat,
      sender: sender,
      content: content,
    });
    res.status(201).json(message);
  } catch (e) {
    next(e);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { chat } = req.body;

    const messages = await Message.find({ chat: chat });
    return res.status(200).json(messages);
  } catch (e) {
    next(e);
  }
};

module.exports = { newMessage, getMessage };
