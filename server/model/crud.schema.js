import mongoose from "mongoose";


const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    }
});

export default mongoose.model.Employee || mongoose.model("Employees", schema);