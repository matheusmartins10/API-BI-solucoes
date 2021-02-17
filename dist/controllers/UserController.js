"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateUser_1 = require("../models/CreateUser");
class UserController {
    async store(req, res) {
        const repository = typeorm_1.getRepository(CreateUser_1.User);
        const { name, email, password } = req.body;
        const userExists = await repository.findOne({ where: { email } });
        if (userExists) {
            return res.sendStatus(409);
        }
        const user = repository.create({ name, email, password });
        await repository.save(user);
        return res.json(user);
    }
    async index(req, res) {
        return res.status(200).json({ message: 'Hello user' });
    }
    async forgot(req, res) {
        const { email } = req.body;
        try {
            const user = await typeorm_1.getRepository(CreateUser_1.User).find({
                where: {
                    email
                }
            });
            const newPassword = crypto_1.default.randomBytes(4).toString('hex');
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'mathews20104540@gmail.com',
                    pass: '24563930a'
                }
            });
            const data = {
                to: email,
                from: 'Administrador',
                subject: 'Recuperação de senha',
                html: `<p>Olá a sua nova senha é ${newPassword}</p>`
            };
            transporter.sendMail(data, async () => {
                const password = await bcrypt_1.default.hash(newPassword, 8);
                typeorm_1.getRepository(CreateUser_1.User).update(user[0].id, {
                    password
                }).then(() => {
                    return res.status(200).json({ message: `google senha foi enviado para o email: ${email}.` });
                }).catch(() => {
                    return res.status(404).json({ message: 'user not found' });
                });
            });
        }
        catch (err) {
            return res.status(404).json({ message: 'User not found' });
        }
    }
}
exports.default = new UserController();
