import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: {value: true,
                   message: 'Поле name является обязательным'},
        minlength: [2, 'Минимальная длина - 2 сивмола'],
        maxlength: [40, 'Максимальная длина - 40 символов']
    },
    about: {
        type: String,
        required: {value: true,
                   about: 'Поле name является обязательным'},
        minlength: [2, 'Минимальная длина - 2 сивмола'],
        maxlength: [30, 'Максимальная длина - 40 символов']
    },
    avatar: {
        type: String,
        required: {value: true,
                  about: 'Поле avatar является обязательным'},
    }
}, {versionKey: false, timestamps: true});

export const User = mongoose.model('user', userSchema);