import { Request, Response } from 'express';
import MyListService from '../services/myListService';

class MyListController {
  public async addToMyList(req: Request, res: Response): Promise<void> {
    try {
      const { userId, contentId, contentType } = req.body;

      if (!userId || !contentId || !contentType) {
        res
          .status(401)
          .json({ error: 'User ID, Content ID & Content Type are required!' });
        return;
      }
      const listItem = await MyListService.addToMyList(
        userId,
        contentId,
        contentType
      );
      res.status(201).json(listItem);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async removeFromMyList(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      const { contentId } = req.params;

      if (!userId || !contentId) {
        res.status(401).json({ error: 'User ID & Content ID are required!' });
        return;
      }
      await MyListService.removeFromMyList(userId, contentId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async listMyItems(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;
      if (!userId) {
        res.status(401).json({ error: 'User ID is required!' });
        return;
      }
      const { page = 1, limit = 10 } = req.query;
      const items = await MyListService.listMyItems(
        userId,
        Number(page),
        Number(limit)
      );
      res.status(200).json(items);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new MyListController();
