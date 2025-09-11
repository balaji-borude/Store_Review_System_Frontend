import express from "express";
import { createRating,getAllRatings} from "../controller/RatingController.js";
import { auth } from "../middlewares/auth.js";

// import {isStoreOwner} from '../middlewares/auth.js'
// TODOS ==> add auth middlewares

const router = express.Router();

router.post("/createRating",auth,createRating);
router.get("/getAllRatings",getAllRatings);
// router.get("/getAverageRating",getAverageRating);


export default router;