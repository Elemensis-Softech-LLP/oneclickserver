import { Router } from 'express';
import * as PlanController from '../controllers/plan.controller';
const router = new Router();

// Get all Plans
router.route('/').get(PlanController.getPlans);

// Get one plan by pid
router.route('/:pid').get(PlanController.getPlan);

// Add a new plan
router.route('/').post(PlanController.addPlan);

// Delete a plan by pid
router.route('/:pid').delete(PlanController.deletePlan);

export default router;
