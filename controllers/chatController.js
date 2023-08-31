import chatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const responsive = await newChat.save();
    res.status(200).json(responsive);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const findUserChat = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    const chat = await chatModel.findOne({
      members: [firstId, secondId],
    });

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
