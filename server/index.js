require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const models = require('./models/models');
const sequelize = require('./db');
const router = require('./routes/index');
const errorHandler = require('./middleware/error');
const path = require('path');

const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroSequelize = require('admin-bro-sequelizejs');
AdminBro.registerAdapter(AdminBroSequelize);
const db = require('./models/models');
const { ADMIN_BRO_TMP_DIR } = require('admin-bro');

const adminBro = new AdminBro({
    resources: [
        {resource: db.User},
        {resource: db.Participant},
        {resource: db.University},
        {resource: db.Diploma},
        {resource: db.Event},
        {resource: db.Certificate},
        {resource: db.Participant_universtity},
        {resource: db.Participant_diploma},
        {resource: db.Participant_event},
        {resource: db.Participant_certificate}
    ],
    rootPath: '/admin',
})

const ADMIN = {
    email: 'dowgy656@gmail.com',
    password: '89037839344Rd'
};

const adminBroRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: 'rdovgii',
    cookiePassword: 'rdovgii89037839344',
    authenticate: async (email, password) => {
        if (email===ADMIN.email && password === ADMIN.password) {
            return ADMIN;
        }

        return null;
    }
});

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use('/admin', adminBroRouter);

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