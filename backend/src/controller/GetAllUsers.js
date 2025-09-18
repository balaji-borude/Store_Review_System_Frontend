
import prisma from "../config/prismaClient.js";

// where i have to find the user from db whore role == User


export const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "User",   // only users with role = "User"
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
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
