"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdmin1612880804784 = void 0;
const typeorm_1 = require("typeorm");
class CreateAdmin1612880804784 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" ');
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'admin',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('admin');
    }
}
exports.CreateAdmin1612880804784 = CreateAdmin1612880804784;
