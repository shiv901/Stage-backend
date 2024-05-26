import { Router } from 'express';
import MyListController from '../controllers/myListController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

router.post('/mylist', verifyToken, MyListController.addToMyList);

router.delete(
  '/mylist/:contentId',
  verifyToken,
  MyListController.removeFromMyList
);

router.get('/mylist', verifyToken, MyListController.listMyItems);

export default router;
