const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const M = require('minimatch');

const User = sequelize.define(
    'user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING, unique: true, allowNull: false},
        login: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, defaultValue: "USER"}
    }
);

const Participant = sequelize.define(
    'participant', 
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        surname: {type: DataTypes.STRING, allowNull: false},
        about: {type: DataTypes.TEXT},
        specialization: {type: DataTypes.STRING},
        role: {type: DataTypes.STRING, allowNull: false},
        avatar: {type: DataTypes.STRING},
        registration: {type: DataTypes.DATE}
    }
);

const University = sequelize.define(
    'university',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, unique: true, allowNull: false},
        address: {type: DataTypes.STRING}
    }
);

const Diploma = sequelize.define(
    'diploma',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        place: {type: DataTypes.STRING},
        organization: {type: DataTypes.STRING}
    }
);

const Event = sequelize.define(
    'event',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        place: {type: DataTypes.STRING},
        organization: {type: DataTypes.STRING}
    }
);

const Conferention = sequelize.define(
    'event',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        place: {type: DataTypes.STRING},
        organization: {type: DataTypes.STRING}
    }
);

const Participant_universtity = sequelize.define(
    'participant_universities',
    {
        link_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }
);

const Participant_diploma = sequelize.define(
    'participant_diploma',
    {
        link_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }
);

const Participant_event = sequelize.define(
    'participant_event',
    {
        link_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }
);

const Participant_conferention = sequelize.define(
    'participant_conferention',
    {
        link_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    }
);

User.hasOne(Participant);
Participant.belongsTo(User);

Participant.belongsToMany(University, {through: Participant_universtity});
University.belongsToMany(Participant, {through: Participant_universtity});

Participant.belongsToMany(Diploma, {through: Participant_diploma});
Diploma.belongsToMany(Participant, {through: Participant_diploma});

Participant.belongsToMany(Event, {through: Participant_event});
Event.belongsToMany(Participant, {through: Participant_event});

Participant.belongsToMany(Conferention, {through: Participant_conferention});
Conferention.belongsToMany(Participant, {through: Participant_conferention});

module.exports = {
    User,
    Participant,
    University,
    Diploma,
    Event,
    Conferention,
    Participant_universtity,
    Participant_diploma,
    Participant_event,
    Participant_conferention
};