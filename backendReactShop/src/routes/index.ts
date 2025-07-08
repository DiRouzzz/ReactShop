import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import productRoutes from './product';
import favoriteRoutes from './favorites';
import cartRoutes from './cart';
import orderRoutes from './order';

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

export default router;
