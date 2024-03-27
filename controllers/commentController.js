import Comment from "../models/comment.js";

const CommentController = {
  create: async (req, res) => {
    try {
      const { userId, postId, content } = req.body;
      // Tạo một commentId ngẫu nhiên
      const commentId = "CM" + Math.floor(1000 + Math.random() * 9000);
      // Tạo comment mới
      const newComment = new Comment({ userId, postId, commentId, content });
      await newComment.save();
      res
        .status(201)
        .json({ message: "Bình luận đã được tạo", comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
  edit: async (req, res) => {
    try {
      const { commentId } = req.params;
      const { userId, content } = req.body;
      // Kiểm tra xem userId có phải là người tạo comment không
      const comment = await Comment.findOne({ commentId });
      if (!comment) {
        return res.status(404).json({ message: "Bình luận không tồn tại" });
      }
      if (comment.userId !== userId) {
        return res
          .status(403)
          .json({ message: "Bạn không có quyền chỉnh sửa bình luận này" });
      }
      // Cập nhật nội dung của comment
      comment.content = content;
      await comment.save();
      res.status(200).json({ message: "Bình luận đã được cập nhật", comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

export default CommentController;
