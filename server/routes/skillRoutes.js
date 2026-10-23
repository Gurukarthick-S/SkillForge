
import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getSkills,
  createSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

// All skill routes require authentication
router.use(protect);

router.route("/")
  .get(getSkills)
  .post(createSkill);

router.route("/:id")
  .delete(deleteSkill);

export default router;
