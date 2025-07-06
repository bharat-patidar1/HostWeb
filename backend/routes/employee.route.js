import express from 'express'
import { deleteEmployeeById, employeeLogin, employeeLogout, employeeRegister, getAllEmployees, getEmployeeById, updatePassword } from '../controllers/employee.controller.js';
import { isAuthenticatedAdmin } from '../middleware/isAuthenticated.js'
const router = express.Router();

// Use explicit route definitions to prevent URL parsing
router.post('/register', (req, res, next) => {
    employeeRegister(req, res, next);
});
router.post('/login', (req, res, next) => {
    employeeLogin(req, res, next);
});
router.get('/logout', (req, res, next) => {
    employeeLogout(req, res, next);
});
router.put('/updatePassword', (req, res, next) => {
    updatePassword(req, res, next);
});
router.delete('/delete/:id', (req, res, next) => {
    deleteEmployeeById(req, res, next);
});
router.get('/get', (req, res, next) => {
    isAuthenticatedAdmin(req, res, (err) => {
        if (err) return next(err);
        getAllEmployees(req, res, next);
    });
});
// router.route('/get/:id').get(isAuthenticatedAdmin , getEmployeeById);

export default router;