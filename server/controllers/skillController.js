import Skill from '../models/Skill.js';

// Temporary user ID
// Later we will replace this with req.user._id

// GET /api/skills
const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({
            user: req.user._id // Replace with the actual user ID from the request
        }).sort({ createdAt: -1 });

        res.status(200).json(skills);
    } catch (error) {
        console.error("GET SKILLS ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// POST /api/skills
const createSkill = async (req, res) => {
    try {
        const {
            skillName,
            category,
            level,
            completed
        } = req.body;

        // Check skill name
        if (!skillName) {
            return res.status(400).json({
                message: "skillName is required"
            });
        }

        // Check category
        if (!category) {
            return res.status(400).json({
                message: "category is required"
            });
        }

        // Create skill
        const newSkill = new Skill({
            user: req.user._id, // Replace with the actual user ID from the request 
            skillName: skillName.trim(),
            category,
            level: level || "Beginner",
            completed: completed || false
        });

        // Save to MongoDB
        const savedSkill = await newSkill.save();

        console.log("SKILL CREATED:", savedSkill);

        res.status(201).json(savedSkill);

    } catch (error) {
        console.error("CREATE SKILL ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE /api/skills/:id
const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        // Find skill
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        // Check ownership
        if (skill.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized to delete this skill"
            });
        }

        // Delete
        await skill.deleteOne();

        res.status(200).json({
            id,
            message: "Skill deleted"
        });

    } catch (error) {
        console.error("DELETE SKILL ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};


export {
    getSkills,
    createSkill,
    deleteSkill
};