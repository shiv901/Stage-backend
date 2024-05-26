import ListItem, { IListItem } from '../models/listItem';

class MyListService {
  public async addToMyList(
    userId: string,
    contentId: string,
    contentType: 'Movie' | 'TVShow'
  ): Promise<IListItem> {
    const listItem = new ListItem({ userId, contentId, contentType });
    return await listItem.save();
  }

  public async removeFromMyList(
    userId: string,
    contentId: string
  ): Promise<void> {
    await ListItem.deleteOne({ userId, contentId });
  }

  public async listMyItems(
    userId: string,
    page: number,
    limit: number
  ): Promise<IListItem[]> {
    const skip = (page - 1) * limit;
    return await ListItem.find({ userId }).skip(skip).limit(limit);
  }
}

export default new MyListService();
