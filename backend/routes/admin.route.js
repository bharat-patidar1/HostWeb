import express from 'express'
import { adminLogin, adminLogout, adminRegister, getAttendanceSummary, getWorkHours, updatePassword } from '../controllers/admin.controller.js';
import { isAuthenticatedAdmin } from '../middleware/isAuthenticated.js';

const router = express.Router();

// Use explicit route definitions to prevent URL parsing
router.post('/register', (req, res, next) => {
    adminRegister(req, res, next);
});
router.post('/login', (req, res, next) => {
    adminLogin(req, res, next);
});
router.get('/logout', (req, res, next) => {
    adminLogout(req, res, next);
});
router.put('/updatePassword', (req, res, next) => {
    updatePassword(req, res, next);
});
router.get('/getWorkHour', (req, res, next) => {
    getWorkHours(req, res, next);
});
router.get('/getAttendanceSummary', (req, res, next) => {
    getAttendanceSummary(req, res, next);
});

export default router;