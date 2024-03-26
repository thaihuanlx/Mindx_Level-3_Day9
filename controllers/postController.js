import Post from "../models/post";

const PostController = {
  create: async (req, res) => {
    try {
      const { userId, content } = req.body;
      // Tạo một postId ngẫu nhiên
      const postId = "PS" + Math.floor(1000 + Math.random() * 9000);
      // Tạo bài post mới
      const newPost = new Post({ userId, postId, content });
      await newPost.save();
      res.status(201).json({ message: "Bài viết đã được tạo", post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
  edit: async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId, content } = req.body;
      // Kiểm tra xem userId có phải là người tạo bài post không
      const post = await Post.findOne({ postId });
      if (!post) {
        return res.status(404).json({ message: "Bài viết không tồn tại" });
      }
      if (post.userId !== userId) {
        return res
          .status(403)
          .json({ message: "Bạn không có quyền chỉnh sửa bài viết này" });
      }
      // Cập nhật nội dung của bài post
      post.content = content;
      await post.save();
      res.status(200).json({ message: "Bài viết đã được cập nhật", post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

export default PostController;
