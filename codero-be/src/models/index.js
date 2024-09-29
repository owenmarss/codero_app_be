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
db.schoolCentre = require("./schoolcentre.model.js")(sequelize, Sequelize);
db.materi = require("./materi.model.js")(sequelize, Sequelize);
db.pertemuan = require("./pertemuan.model.js")(sequelize, Sequelize);
db.message = require("./message.model.js")(sequelize, Sequelize);
db.messageRecipient = require("./message_recipient.model.js")(sequelize, Sequelize);


// Materi-Pertemuan relationship
db.materi.hasMany(db.pertemuan, { foreignKey: 'id_materi', as: 'pertemuan' });
db.pertemuan.belongsTo(db.materi, { foreignKey: 'id_materi', as: 'materi' });


// Message-Recipient relationship
db.user.hasMany(db.message, { foreignKey: 'id_pengirim', as: 'pengirim' });
db.message.belongsTo(db.user, { foreignKey: 'id_pengirim', as: 'pengirim' });

db.message.hasMany(db.messageRecipient, { foreignKey: 'id_message', onDelete: 'CASCADE' });
db.messageRecipient.belongsTo(db.message, { foreignKey: 'id_message' });

db.user.hasMany(db.messageRecipient, { foreignKey: 'id_penerima', onDelete: 'CASCADE', as: 'penerima' });
db.messageRecipient.belongsTo(db.user, { foreignKey: 'id_penerima', as: 'penerima' });



module.exports = db;
