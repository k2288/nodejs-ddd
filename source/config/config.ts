import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const AUTH = {
    secretKey: process.env.SECRET_KEY || 'somesupersecretkey'
};

const config = {
    server: SERVER,
    auth: AUTH,
    isProduction : process.env.NODE_ENV === 'production'
};

export default config;
