const {Sequelize, DataTypes} = require('sequelize')
const dbConfig = require('../config/db.config.js')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database & tables updated!");
    })
    .catch((err) => {
        console.error("Error updating database:", err);
    });

// Define sequelize and Sequelize
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


// Define models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.schedule = require("./schedule.model.js")(sequelize, Sequelize);
db.userSchedule = require("./user_schedule.model.js")(sequelize, Sequelize);
db.partner = require("./partner.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.materi = require("./materi.model.js")(sequelize, Sequelize);
db.pertemuan = require("./pertemuan.model.js")(sequelize, Sequelize);
db.message = require("./message.model.js")(sequelize, Sequelize);
db.messageRecipient = require("./message_recipient.model.js")(sequelize, Sequelize);


// Define Relationships
//* Partner - Materi relationship
db.partner.belongsTo(db.materi, { foreignKey: 'id_materi', as: 'materi' });
db.materi.hasMany(db.partner, { foreignKey: 'id_materi', as: 'partner' });


//* Student - Materi relationship
db.student.belongsTo(db.materi, { foreignKey: 'id_materi', as: 'materi' });
db.materi.hasMany(db.student, { foreignKey: 'id_materi', as: 'student' });


//* Schedule - Partner relationship
db.schedule.belongsTo(db.partner, { foreignKey: 'partner_id', as: 'partner' });
db.partner.hasMany(db.schedule, { foreignKey: 'partner_id', as: 'schedules' });


//* Schedule - Student relationship
db.schedule.belongsTo(db.student, { foreignKey: 'student_id', as: 'student' });
db.student.hasMany(db.schedule, { foreignKey: 'student_id', as: 'schedules' });


//* User - Schedule relationship via user_schedule
// ? One-to-Many relationship
// db.user.hasMany(db.userSchedule, { foreignKey: 'user_id', as: 'userSchedule' });
// db.userSchedule.belongsTo(db.user, { foreignKey: 'user_id',  as: 'user' });

// db.schedule.hasMany(db.userSchedule, { foreignKey: 'schedule_id', as: 'userSchedule' });
// db.userSchedule.belongsTo(db.schedule, { foreignKey: 'schedule_id', as: 'schedule' });

// ? Many-to-Many relationship
db.user.belongsToMany(db.schedule, {
    through: db.userSchedule,
    foreignKey: 'user_id',
    otherKey: 'schedule_id',
    as: 'schedules'
});
db.schedule.belongsToMany(db.user, {
    through: db.userSchedule,
    foreignKey: 'schedule_id',
    otherKey: 'user_id',
    as: 'users'
});


//* Materi - Pertemuan relationship
db.materi.hasMany(db.pertemuan, { foreignKey: 'id_materi', as: 'pertemuan' });
db.pertemuan.belongsTo(db.materi, { foreignKey: 'id_materi', as: 'materi' });


//* Message - Recipient relationship
db.user.hasMany(db.message, { foreignKey: 'id_pengirim', as: 'pengirim' });
db.message.belongsTo(db.user, { foreignKey: 'id_pengirim', as: 'pengirim' });

db.message.hasMany(db.messageRecipient, { foreignKey: 'id_message', onDelete: 'CASCADE' });
db.messageRecipient.belongsTo(db.message, { foreignKey: 'id_message' });

db.user.hasMany(db.messageRecipient, { foreignKey: 'id_penerima', onDelete: 'CASCADE', as: 'penerima' });
db.messageRecipient.belongsTo(db.user, { foreignKey: 'id_penerima', as: 'penerima' });



module.exports = db;
