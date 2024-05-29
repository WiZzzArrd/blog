import CommentModel from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const doc = new CommentModel({
      author: req.body.author,
      articleId: req.body.articleId,
      content: req.body.content,
    });

    const comment = await doc.save();

    res.json(comment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Не удалось создать комментарий",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate().exec();

    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};
