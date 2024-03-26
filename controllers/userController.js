import User from "../models/user";

const UserController = {
  register: async (req, res) => {
    try {
      const { userName } = req.body;
      // Kiểm tra xem userName đã tồn tại chưa
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
      }
      // Tạo một userId ngẫu nhiên
      const userId = "US" + Math.floor(1000 + Math.random() * 9000);
      // Tạo user mới
      const newUser = new User({ userName, userId });
      await newUser.save();
      res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
  login: async (req, res) => {
    try {
      const { userName } = req.body;
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  },
};

export default UserController;
