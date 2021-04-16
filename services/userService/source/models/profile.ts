import mongoose, { Schema } from 'mongoose';
import IProfile from '../interfaces/profile';

const ProfileSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String, required: true },
        imageUrl: { type: String },
        selfIntro: { type: String },
        roomId: { type: String }
    },
    {
        timestamps: false
    }
);

ProfileSchema.post<IProfile>('save', function () {
    // logging.info('We saved a profile: ', this.username);
});

export default mongoose.model<IProfile>('Profile', ProfileSchema);
