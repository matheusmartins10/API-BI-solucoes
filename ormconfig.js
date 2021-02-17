module.exports = {
    "url": process.env.DATABASE_URL,
    "type": "postgres",
    "entities": [
       "./dist/models/*.js"
    ],
    "migrations": [
       "./dist/database/migrations/*.js"
    ],
    "name": "default",
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}