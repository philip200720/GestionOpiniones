import { Schema, model } from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [250, "Description cannot exceed 250 characters"]
    }
},
{
        versionKey: false,
        timestamps: true
})

export default model("Category", CategorySchema)