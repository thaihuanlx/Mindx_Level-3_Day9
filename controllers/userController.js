import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const UserController = {
  register: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }
      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);
      // Tạo user mới
      const newUser = new User({ userName, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Kiểm tra xem email có tồn tại không
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }
      // Kiểm tra mật khẩu
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Mật khẩu không chính xác' });
      }
      // Tạo và gửi token JWT
      const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
  }
};

export default UserController;