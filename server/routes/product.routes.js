import { Router } from 'express';
import * as ProductController from '../controllers/product.controller';
const router = new Router();

// Get all products
router.route('/').get(ProductController.getProducts);

// Get one product by pid
router.route('/:pid').get(ProductController.getProduct);

// Add a new product
router.route('/').post(ProductController.addProduct);

// Delete a product by pid
router.route('/:pid').delete(ProductController.deleteProduct);

export default router;
