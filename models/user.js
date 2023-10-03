import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    about: {
        type: String,
        required: true,
        minilength: 2,
        maxlength: 30
    },
    avatar: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', userSchema);