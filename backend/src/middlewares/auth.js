import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";

// authentication middleware
export const auth = async (req, res, next) => {
    try{
        console.log("Entering in Auth middleware")
        //extract token
        const token =req.header("Authorization").replace("Bearer ", "");

        console.log("Printing Token From Auth --> ", token);

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }



        try{
            const decode =  jwt.verify(token, JWT_SECRET);
            console.log(decode);
            req.user = decode;    
            // user chya request madhe Token pathavle ====> mahnje pratyek user chya request madhe he token janar --> tyacha fayda as honar ki --> pudhcya konntya hi request user takel tyamadhe token asel ch 
            
            // const payload={
            //     id:user._id,
            //     email:user.email,
            //     accountType:user.accountType
            // };
            // ------------> ha jo data user ne payload madhe store kela ahe na to apan acces karu shakkto 
        }
        catch(err) {
          
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
};


// is admin  middleware 
export const isAdmin = async(req,res,next)=>
{
    try {
        // fetching role from request and checking the role is student  
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Admin"
            })
        }

        next();  

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Admin role cannot be verified "
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
            message:"Admin role cannot be verified "
        })
    }
}