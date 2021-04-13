import { Document } from 'mongoose';

export default interface IProfile extends Document {
    userId: string;
    username: string;
    imageUrl: string;
    selfIntro: string;
    roomId: string;
}
