import messageModel from "../models/messageModel.js";

export const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = new messageModel({
      chatId,
      senderId,
      text,
    });
    const response = await message.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
