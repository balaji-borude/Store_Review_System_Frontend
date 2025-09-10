import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// Create Rating (insert or update if user already rated)
export const createRating = async (req, res) => {
  try {
    const { score, userId, storeId } = req.body;

    // valodiation 
    if (!score || !userId || !storeId) {
      return res.status(400).json({
        success: false,
        message: "Please provide score, userId and storeId",
      });
    };

        // if usr do not give rating and press submit then this ==> will show error
    if (score < 1 || score > 5) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 1 and 5",
      });
    }


    // validation if user is alredy give tthe rating then show the messagse user already give rating 

        const existingRating = await prisma.rating.findFirst({
      where: {
        userId: parseInt(userId),
        storeId: parseInt(storeId),
      },
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this store",
      });
    };





    // careate rating in Db
    const rating = await prisma.rating.create({
      data: {
        score,
        user: { connect: { id: userId } },
        store: { connect: { id: storeId } },
      },
    });

    return res.status(200).json({
      success: true,
      message:"rating Created Succesfully",
      data: rating,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating rating",
      error: error.message,
    });
  }
};


// Get All Ratings for a Store
export const getAllRatings = async (req, res) => {
  try {

    // TODO ==> 
    // const { storeId } = req.params;  
    const {storeId} = req.body;

    const ratings = await prisma.rating.findMany({
      where: { storeId: parseInt(storeId) },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    return res.json({
      success: true,
      count: ratings.length,
      data: ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching ratings",
      error: error.message,
    });
  }
};


// Get Average Rating for a Store
export const getAverageRating = async (req, res) => {
  try {
    const { storeId } = req.params;

    //validation
    if(!storeId){
        return res.status(400).json({
            success:false,
            message:"StoreId is required "
        })
    };

    // aggregate funcion cha user karun avg rating find keli 
    const avg = await prisma.rating.aggregate({
      where: { storeId: parseInt(storeId) },
      _avg: { score: true },
      _count: { score: true },
    });

    // total rating avg rating return keli res madhe ==<
    return res.status(200).json({
      success: true,
      message:"Avg ratingf is Fetch succesffully",
      storeId: parseInt(storeId),
      averageRating: avg._avg.score || 0,
      totalRatings: avg._count.score,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error calculating average rating",
      error: error.message,
    });
  }
};
