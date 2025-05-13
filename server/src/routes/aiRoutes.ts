import express from "express";
import { chatWithScenario } from "../controllers/aiController";

const router = express.Router();

router.post("/chat", chatWithScenario);

export default router;
