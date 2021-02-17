"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const AdminController_1 = __importDefault(require("./controllers/AdminController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const router = express_1.Router();
router.get('/', (req, res) => {
    return res.json({ message: 'Hello heroku' });
});
// Users
router.post('/users', auth_1.default, UserController_1.default.store);
router.post('/sessions', AuthController_1.default.authenticate);
router.post('/forgot', UserController_1.default.forgot);
router.get('/users', auth_1.default, UserController_1.default.index);
// Admin
router.post('/admin', AdminController_1.default.store);
router.post('/signin', AuthController_1.default.authenticateAdmin);
router.get('/admin/users', auth_1.default, AdminController_1.default.index);
exports.default = router;
