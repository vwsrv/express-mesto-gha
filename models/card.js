import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: {value: true,
                   message: 'Поле name является обязательным'},
        minlength: [2, 'Минимальная длина - 2 сивмола'],
        maxlength: [30, 'Максимальная длина - 30 символов']
    },
    link: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false, timestamps: true});

export const Card = mongoose.model('card', cardSchema);