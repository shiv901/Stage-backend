import mongoose, { Schema, Document } from 'mongoose';

export interface IListItem extends Document {
  userId: string;
  contentId: string;
  contentType: 'Movie' | 'TVShow';
}

const ListItemSchema: Schema = new Schema({
  userId: { type: String, required: true },
  contentId: { type: String, required: true },
  contentType: { type: String, enum: ['Movie', 'TVShow'], required: true },
});

ListItemSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export default mongoose.model<IListItem>('ListItem', ListItemSchema);
