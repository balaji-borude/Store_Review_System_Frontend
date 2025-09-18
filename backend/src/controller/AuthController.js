import bcrypt from "bcrypt";
import prisma from "../config/prismaClient.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const signUp = async (req, res) => {
  try {
    const { role, name, email, password, address } = req.body;

    if (!role || !name || !email || !password || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing_user = await prisma.user.findUnique({ where: { email } });
    if (existing_user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        role,
        name,
        email,
        password: hashedPassword,
        address,
      },
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong in signup",
      error,
    });
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    // checking email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials, user not found. Please signup first.",
      });
    }

    // compare password with db passs
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    console.log("JWT secret kley ===> ", JWT_SECRET);

    const payload = { id: user.id, email: user.email, role: user.role };

    // Token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    // Clone user object and remove password
    const userResponse = { ...user, password: undefined, token };

    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed! Please try again later",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const email = req.user.email; // getting email fro m middleware

    if (!password || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // cheking user 
    const checkingUser = await prisma.user.findFirst({ where: { email } });
    if (!checkingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare currentpass to user enterd current passwoed  
    const comparePassword = await bcrypt.compare(password, checkingUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // hased new pass 
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { email },
      data: { password: hashedNewPassword }
    });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again later."
    });
  }
};

//


// where i have to find the user from db whore role == User


export const getAllUser = async (req, res) => {
  try {
    // where: {role: "User",   // only users with role = "User"}
       
    const users = await prisma.user.findMany({
     
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        address:true,
        createdAt: true, 
      },
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users with role 'User'",
      error: error.message,
    });
  }
};