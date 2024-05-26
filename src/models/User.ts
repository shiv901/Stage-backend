import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  preferences?: {
    favoriteGenres: string[];
    dislikedGenres: string[];
  };
  watchHistory?: Array<{
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }],
  },
  watchHistory: [
    {
      contentId: { type: String },
      watchedOn: { type: Date },
      rating: { type: Number },
    },
  ],
});

export default mongoose.model<IUser>('User', UserSchema);
