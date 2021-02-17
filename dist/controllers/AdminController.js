"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const CreateAdmin_1 = require("../models/CreateAdmin");
const CreateUser_1 = require("../models/CreateUser");
class UserController {
    async store(req, res) {
        const repository = typeorm_1.getRepository(CreateAdmin_1.Admin);
        const { name, email, password } = req.body;
        const adminExists = await repository.findOne({ where: { email } });
        if (adminExists) {
            return res.sendStatus(409);
        }
        const admin = repository.create({ name, email, password });
        await repository.save(admin);
        return res.json(admin);
    }
    async index(req, res) {
        const userRepository = typeorm_1.getRepository(CreateUser_1.User);
        const users = await userRepository.find();
        if (!users) {
            return res.status(404).json({ message: 'Not found users' });
        }
        return res.status(200).json(users);
    }
}
exports.default = new UserController();
