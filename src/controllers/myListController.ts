import { Request, Response } from 'express';
import ListItem from '../models/listItem';
import { handleError } from '../helperFns';

// Add an item to the user's list
export const addItem = async (req: Request, res: Response) => {
  try {
    const { userId, contentId, contentType } = req.body;

    if (!userId || !contentId || !contentType) {
      return handleError(
        res,
        'userId, contentId, and contentType are required',
        400
      );
    }

    const existingItem = await ListItem.findOne({ userId, contentId });
    if (existingItem) {
      return handleError(res, 'Item is already in the list', 400);
    }

    const listItem = new ListItem({ userId, contentId, contentType });
    await listItem.save();

    res.status(201).json(listItem);
  } catch (error) {
    console.error(error);
    handleError(res, 'Failed to add item to the list');
  }
};

// Remove an item from the user's list
export const removeItem = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { contentId } = req.params;

    if (!userId || !contentId) {
      return handleError(res, 'userId and contentId are required', 400);
    }

    const deletedItem = await ListItem.findOneAndDelete({ userId, contentId });
    if (!deletedItem) {
      return handleError(res, 'Item not found in the list', 404);
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    handleError(res, 'Failed to remove item from the list');
  }
};

// List items in the user's list
export const listItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { page = 1, limit = 10 } = req.query;

    if (!userId) {
      return handleError(res, 'userId is required', 400);
    }

    const items = await ListItem.find({ userId })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    handleError(res, 'Failed to list items');
  }
};
