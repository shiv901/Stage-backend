import { Router } from 'express';
import {
  addItem,
  removeItem,
  listItems,
} from '../controllers/myListController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

router.post('/mylist', verifyToken, addItem);
router.delete('/mylist/:contentId', verifyToken, removeItem);
router.get('/mylist', verifyToken, listItems);

export default router;
