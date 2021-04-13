import { Document } from 'mongoose';

export default interface IUser extends Document {
    email: string;
    password: string;
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
    question3: string;
    answer3: string;
}
