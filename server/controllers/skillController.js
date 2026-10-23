
import mongoose from "mongoose";
import Skill from "../models/Skill.js";

// GET /api/skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(skills);
  } catch (error) {
    console.error("GET SKILLS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch skills.",
    });
  }
};

// POST /api/skills
export const createSkill = async (req, res) => {
  try {
    const {
      skillName,
      category,
      level,
      completed,
      percentage,
    } = req.body;

    if (
      typeof skillName !== "string" ||
      !skillName.trim()
    ) {
      return res.status(400).json({
        message: "A skill name is required.",
      });
    }

    if (
      typeof category !== "string" ||
      !category.trim()
    ) {
      return res.status(400).json({
        message: "A skill category is required.",
      });
    }

    const allowedLevels = [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert",
    ];

    if (
      level !== undefined &&
      !allowedLevels.includes(level)
    ) {
      return res.status(400).json({
        message: "Invalid skill level.",
      });
    }

    if (
      completed !== undefined &&
      typeof completed !== "boolean"
    ) {
      return res.status(400).json({
        message: "Completed must be true or false.",
      });
    }

    const skillData = {
      user: req.user._id,
      skillName: skillName.trim(),
      category: category.trim(),
      level: level || "Beginner",
      completed: completed ?? false,
    };

    if (percentage !== undefined) {
      const numericPercentage = Number(percentage);

      if (
        !Number.isFinite(numericPercentage) ||
        numericPercentage < 0 ||
        numericPercentage > 100
      ) {
        return res.status(400).json({
          message: "Percentage must be between 0 and 100.",
        });
      }

      skillData.percentage = numericPercentage;
    }

    const savedSkill = await Skill.create(skillData);

    return res.status(201).json(savedSkill);
  } catch (error) {
    console.error("CREATE SKILL ERROR:", error);

    return res.status(500).json({
      message: "Failed to create skill.",
    });
  }
};

// DELETE /api/skills/:id
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid skill ID.",
      });
    }

    const skill = await Skill.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found.",
      });
    }

    await skill.deleteOne();

    return res.status(200).json({
      id: skill._id,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE SKILL ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete skill.",
    });
  }
};
