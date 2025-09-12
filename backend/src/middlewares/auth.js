import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

// authentication middleware
// export const auth = async (req, res, next) => {
//     try{
//         console.log("Entering in Auth middleware")
//         //extract token
//         // const token =req.header("Authorization").replace("Bearer ", "");
//         const token = req.header("Authorization").replace("Bearer ", "");

//         console.log("Printing Token From Auth --> ", token);

//         //if token missing, then return response
//         if(!token) {
//             return res.status(401).json({
//                 success:false,
//                 message:'TOken is missing',
//             });
//         }

//         try{
//             const decode =  jwt.verify(token, JWT_SECRET);
//             console.log( "jwt decoded data ==> ",decode);
//             req.user = decode;    
            
//             next();
//         }
//         catch(error) {
          
//             return res.status(401).json({
//                 success:false,
//                 message:'token is invalid',
//                 error:error
//             });
//         }
      
//     }
//     catch(error) {  
//         return res.status(401).json({
//             success:false,
//             message:'Something went wrong while validating the token',
//             error:error
//         });
//     }
// };

export const auth = async (req, res, next) => {
  try {
    console.log("Entering in Auth middleware");

    // Extract token safely
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token is missing or malformed",
      });
    }

    const token = authHeader.replace("Bearer ", "");


    console.log("Printing Token From Auth --> ", token);
    console.log("Printing JWT from auth  ---> ",JWT_SECRET);

    // Verify token
    try {
      const decode = jwt.verify(token, JWT_SECRET);
      console.log("jwt decoded data ==> ",decode);

      req.user = decode; // attach user payload to request
     
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
        error: error.message,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
      error: error.message,
    });
  }
};


// is admin  middleware 
export const isAdmin = async(req,res,next)=>
{
    try {
        // fetching role from request and checking the role is student  
        if(req.user.role !== "Admin"){
          req.userId = req.user.id;
          req.role = req.user.role;
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Admin"
            })
        }

        next();  

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Admin role cannot be verified ",
            error:error
        })
    }
}

// StoreOwner middleware
export const isStoreOwner = async(req,res,next)=>{
    try {
        
        if(req.user.role !== "StoreOwner"){
            return res.status(401).json({
                success:false,
                message:"This is Protected Route for StoreOwner"
            })
        };

        next();
    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"Admin role cannot be verified ",
            error:error
        })
    }
}