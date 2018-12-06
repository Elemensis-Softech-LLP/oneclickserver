import { Router } from 'express';
import PostRouter from './post.routes';
import UserRouter from './user.routes';
import PlanRouter from './plan.routes';
import ProductRouter from './product.routes';

const router = new Router();

router.use('/posts', PostRouter)
router.use('/users', UserRouter)
router.use('/plans', PlanRouter)
router.use('/products', ProductRouter)


export default router;
