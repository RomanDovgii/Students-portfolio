require('dotenv').config();
const express = require('express');
const models = require('./models/models');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
};

start();