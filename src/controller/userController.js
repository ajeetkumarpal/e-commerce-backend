import { createUser, findUserByEmail } from "../repository/userRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  PRIVATE_KEY_TOKEN,
  EXPIRY_TOKEN,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_PRIVATE_KEY_TOKEN,
} from "../config/serverConfig.js";

const registerUser = async (req, res) => {
  const userDetail = req.body;
  try {
    const existUser = await findUserByEmail(userDetail.email);
    if (existUser) {
      return res
        .status(409)
        .json({ message: "user already exists", success: false });
    }

    const registerNewUser = await createUser(userDetail);
    res.status(201).json({
      message: "new user register",
      data: registerNewUser,
      success: true,
    });
  } catch (error) {
    console.log("error in register userController", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

const loginUser = async (req, res) => {
  const userDetail = req.body;
  try {
    const existUser = await findUserByEmail(userDetail.email);
    if (!existUser) {
      return res
        .status(404)
        .json({ message: "user does't exist", success: false });
    }
    const checkPassword = await bcrypt.compare(
      userDetail.password,
      existUser.password,
    );
    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "password invalid", success: false });
    }
    const token = jwt.sign(
      { name: existUser.name, id: existUser._id },
      PRIVATE_KEY_TOKEN,
      { expiresIn: EXPIRY_TOKEN },
    );

    res
      .status(200)
      .json({
        message: "sucessfully login",
        name: existUser.name,
        success: true,
        token: token,
      });
  } catch (error) {
    console.log("error in login userController", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (ADMIN_EMAIL === email && ADMIN_PASSWORD === password) {
      const adminToken = jwt.sign(
        { email, role: "admin" },
        ADMIN_PRIVATE_KEY_TOKEN,
        { expiresIn: "1111111d" },
      );
      res
        .status(200)
        .json({
          message: "admin sucessfully login",
          success: true,
          token: adminToken,
        });
    } else {
      res.status(500).json({ message: "Invalid admin Data", success: false });
    }
  } catch (error) {
    console.log("error in login adminController", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error: error });
  }
};
export { loginUser, registerUser, adminLogin };
