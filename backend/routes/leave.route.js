import express from 'express'
import { isAuthenticatedAdmin, isAuthenticatedEmployee } from '../middleware/isAuthenticated.js';
import { applyLeave, deleteLeave, getAllLeaves, getEmployeeLeaves, updateLeaveStatus } from '../controllers/leave.controller.js';
const router = express.Router();

router.route("/apply").post(isAuthenticatedEmployee, applyLeave);
router.route("/myleaves").get(isAuthenticatedEmployee, getEmployeeLeaves);

router.route("/all").get(isAuthenticatedAdmin, getAllLeaves);
router.route("/:id/status").put(isAuthenticatedAdmin, updateLeaveStatus); //id is leave id
router.route("/:id/delete").delete(isAuthenticatedEmployee, deleteLeave); //id is leave id

export default router;