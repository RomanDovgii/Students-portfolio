require('dotenv').config();
const express = require('express');
const cors = require('cors');
const models = require('./models/models');
const sequelize = require('./db');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

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