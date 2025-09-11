import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Store
export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    // validation
    if(!name||!email||!address|| !ownerId){
        return res.status(400).json({
            success:false,
            message:"Please Fill ALl the Fields"
        })
    }

    console.log("Printing the create store data", name,email,address,ownerId);
    // createh the store
    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        owner: { connect: { id: ownerId } },
      },
    });

    return res.status(200).json({ 
        success: true, 
        message:"Store Created Succesfuully",
        data: store 
    });

  } catch (error) {
    return res.status(500).json({ 
        success: false, 
        message: error.message 
    });
  }
};

// Update Store
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;


    //validating
    if(!id || !name||!address){
         return res.status(400).json({
            success:false,
            message:"Please Fill ALl the Fields"
        })
    };

    const store = await prisma.store.update({
      where: { id: parseInt(id) },
      data: { name, address },
    });

    return res.json({ 
        success: true,
        message:"Store is Updated Succesfully",
        data: store
    });

  } catch (error) {
    return res.status(500).json({ 
        success: false, 
        message: error.message 
    });
  }
};

// Delete Store
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    if(!id){
        return res.status(400).json({
            success:false,
            message:"Store Id is Not Found ",

        })
    };

    // delete the store 
    await prisma.store.delete({
      where: { id: parseInt(id) },
    });

    return res.json({ 
        success: true, 
        message: "Store deleted succesfully "
    });

  } catch (err) {
    return res.status(500).json({ 
        success: false, 
        message: "Isuue is delting the Store ",
        error:err
    });
  }
};

// get all stores 
export const getAllStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      orderBy: { createdAt: "desc" }, 
    });

    // if (!stores || stores.length === 0) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "No stores found",
    //   });
    // }

    return res.status(200).json({
      success: true,
      message: "Stores fetched successfully",
      data: stores,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching stores",
      error: error.message,
    });
  }
};

