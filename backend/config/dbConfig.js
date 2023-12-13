import dotenv from "dotenv";
dotenv.config();

export const HOST = process.env.DB_HOST;
export const USER = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASSWORD;
export const DB = process.env.DB_NAME;
export const dialect = "mysql";
export const port = process.env.DB_PORT;

export const pool = {
    max: 15,
    min: 0,
    acquire: 300000,
    idle: 100000,
};

export default {
    HOST,
    USER,
    PASSWORD,
    DB,
    port,
    pool,
    dialect,
};
