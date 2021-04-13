import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        question1: { type: String },
        answer1: { type: String },
        question2: { type: String },
        answer2: { type: String },
        question3: { type: String },
        answer3: { type: String }
    },
    {
        timestamps: false
    }
);

export default mongoose.model<IUser>('User', UserSchema);
