import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";



// Create Owner
export const createOwner = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if(!name||!email||!password||!address){
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields",
      });
    };

    console.log("hashing password of owenrt")
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("passwor id hashedd --> ",hashedPassword);

    const owner = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPassword, 
        address,
        role: "StoreOwner",
      },
    });

    return res.status(200).json({ 
        success: true, 
        data: owner 
    });

  } catch (error) {
    return res.status(500).json({ 
        success: false, 
        message: "Issue in Creating Ownere",
        error:error.message 
    });
  }
};

// Update Owner
export const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;


    if(!name||!id||!address){
        return res.status(400).json({
            success: false,
            message: "Please fill all fields",
      });
    };


    const owner = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, address },
    });

    return res.json({ 
        success: true, 
        message:"Owner Created Successfully",
        data: owner 
    });
  } catch (err) {
    return res.status(500).json({ 
        success: false, 
        message: err.message 
    });
  }
};

// Delete Owner
export const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success:false,
            message:"Owner Id required "
        })
    }
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ 
        success: true, 
        message: "Owner deleted Succesfuuly" 
    });

  } catch (err) {
    return res.status(500).json({ 
        success: false, 
        message: "Issue in deleting Owner ",
        error:err
    });
  }
};
