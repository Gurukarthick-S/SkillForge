import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        skillName: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true, 
        },
        level:{
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
            default: 'Beginner'
        },
        completed:{
            type: Boolean,
            default: false
        },
        percentage:{
            type: Number,
            min: 0, 
            max: 100
        },
    },
        {
            timestamps: true,
        }
);

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;