import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.js";
import { verifyToken  } from "../middleware/auth.js";


const router = express.Router();

