import express from "express";
import { getSkills, createSkill, deleteSkill } from "../controllers/skillController.js";

const router = express.Router();

router.route("/")
    .get(getSkills)
    .post(createSkill);

router.route("/:id")
    .delete(deleteSkill);

export default router;