const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config.js");

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

sequelize
    .sync({ alter: true })
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

//? Teaching Models
db.teachingSchedule = require("./teaching_schedule.model.js")(
    sequelize,
    Sequelize
);
db.userTeachingSchedule = require("./user_teaching_schedule.model.js")(
    sequelize,
    Sequelize
);
db.teachingAttendance = require("./teaching_attendance.model.js")(
    sequelize,
    Sequelize
);
db.teachingPayroll = require("./teaching_payroll.model.js")(
    sequelize,
    Sequelize
);

//? Office Models
db.officeAttendance = require("./office_attendance.model.js")(sequelize, Sequelize);
db.officePayroll = require("./office_payroll.model.js")(sequelize, Sequelize);

//? Transport Models
db.transport = require("./transport.model.js")(sequelize, Sequelize);
db.reimbursement = require("./reimbursement.model.js")(sequelize, Sequelize);
db.privateTransport = require("./private_transport.model.js")(
    sequelize,
    Sequelize
);
db.privateTransportData = require("./private_transport_data.model.js")(
    sequelize,
    Sequelize
);
db.publicTransport = require("./public_transport.model.js")(
    sequelize,
    Sequelize
);
db.publicTransportData = require("./public_transport_data.model.js")(
    sequelize,
    Sequelize
);

db.partner = require("./partner.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.curriculum = require("./curriculum.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);

db.message = require("./message.model.js")(sequelize, Sequelize);
db.messageRecipient = require("./message_recipient.model.js")(
    sequelize,
    Sequelize
);

// Define Relationships
//* Partner - Curriculum relationship
db.partner.belongsTo(db.curriculum, {
    foreignKey: "id_curriculum",
    as: "curriculum",
});
db.curriculum.hasMany(db.partner, {
    foreignKey: "id_curriculum",
    as: "partner",
});

//* Student - Materi relationship
db.student.belongsTo(db.curriculum, {
    foreignKey: "id_curriculum",
    as: "curriculum",
});
db.curriculum.hasMany(db.student, {
    foreignKey: "id_curriculum",
    as: "student",
});

//* Teaching Schedule - Partner relationship
db.teachingSchedule.belongsTo(db.partner, {
    foreignKey: "partner_id",
    as: "partner",
});
db.partner.hasMany(db.teachingSchedule, {
    foreignKey: "partner_id",
    as: "teachingSchedules",
});

//* Teaching Schedule - Student relationship
db.teachingSchedule.belongsTo(db.student, {
    foreignKey: "student_id",
    as: "student",
});
db.student.hasMany(db.teachingSchedule, {
    foreignKey: "student_id",
    as: "teachingSchedules",
});

// ? Many-to-Many relationship
db.user.belongsToMany(db.teachingSchedule, {
    through: db.userTeachingSchedule,
    foreignKey: "user_id",
    otherKey: "teaching_schedule_id",
    as: "teachingSchedules",
});
db.teachingSchedule.belongsToMany(db.user, {
    through: db.userTeachingSchedule,
    foreignKey: "teaching_schedule_id",
    otherKey: "user_id",
    as: "users",
});

//* UserTeachingSchedule - TeachingAttendance relationship
db.userTeachingSchedule.hasMany(db.teachingAttendance, {
    foreignKey: "user_teaching_schedule_id",
    as: "teachingAttendances",
});
db.teachingAttendance.belongsTo(db.userTeachingSchedule, {
    foreignKey: "user_teaching_schedule_id",
    as: "userTeachingSchedule",
});

//* UserTeachingSchedule - User & TeachingSchedule (Many-to-One)
db.userTeachingSchedule.belongsTo(db.user, {
    foreignKey: "user_id",
    as: "users",
});
db.userTeachingSchedule.belongsTo(db.teachingSchedule, {
    foreignKey: "teaching_schedule_id",
    as: "teachingSchedule",
});

//* TeachingAttendance - TeachingPayroll relationship
db.teachingPayroll.hasMany(db.teachingAttendance, {
    foreignKey: "teaching_payroll_id",
    as: "teachingAttendances",
});
db.teachingAttendance.belongsTo(db.teachingPayroll, {
    foreignKey: "teaching_payroll_id",
    as: "teachingPayroll",
});

//* Transport - Reimbursement relationship
db.reimbursement.hasMany(db.transport, {
    foreignKey: "reimbursement_id",
    as: "transports",
});
db.transport.belongsTo(db.reimbursement, {
    foreignKey: "reimbursement_id",
    as: "reimbursement",
});

//* OfficeAttendance - User relationship
db.officeAttendance.belongsTo(db.user, { foreignKey: "user_id", as: "users" });
db.user.hasMany(db.officeAttendance, { foreignKey: "user_id", as: "officeAttendance" });

//* OfficeAttendance - OfficePayroll relationship
db.officeAttendance.belongsTo(db.officePayroll, { foreignKey: "office_payroll_id", as: "officePayroll" });
db.officePayroll.hasMany(db.officeAttendance, { foreignKey: "office_payroll_id", as: "officeAttendance" });

//* Transport - Public-Transport relationship
db.transport.hasOne(db.publicTransport, {
    foreignKey: "transport_id",
    as: "publicTransport",
});
db.publicTransport.belongsTo(db.transport, {
    foreignKey: "transport_id",
    as: "transport",
});

//* PublicTransport - PublicTransportData relationship
db.publicTransport.hasMany(db.publicTransportData, {
    foreignKey: "public_transport_id",
    as: "publicTransportData",
});
db.publicTransportData.belongsTo(db.publicTransport, {
    foreignKey: "public_transport_id",
    as: "publicTransport",
});

//* Transport - Private-Transport relationship
db.transport.hasOne(db.privateTransport, {
    foreignKey: "transport_id",
    as: "privateTransport",
});
db.privateTransport.belongsTo(db.transport, {
    foreignKey: "transport_id",
    as: "transport",
});

//* PrivateTransport - PrivateTransportData relationship
db.privateTransport.hasMany(db.privateTransportData, {
    foreignKey: "private_transport_id",
    as: "privateTransportData",
});
db.privateTransportData.belongsTo(db.privateTransport, {
    foreignKey: "private_transport_id",
    as: "privateTransport",
});

//* Curriculum - Session relationship
db.curriculum.hasMany(db.session, {
    foreignKey: "id_curriculum",
    as: "sessions",
});
db.session.belongsTo(db.curriculum, {
    foreignKey: "id_curriculum",
    as: "curriculum",
});

//* Message - Recipient relationship
db.user.hasMany(db.message, { foreignKey: "id_sender", as: "sender" });
db.message.belongsTo(db.user, { foreignKey: "id_sender", as: "sender" });

db.message.hasMany(db.messageRecipient, {
    foreignKey: "id_message",
    onDelete: "CASCADE",
});
db.messageRecipient.belongsTo(db.message, { foreignKey: "id_message" });

db.user.hasMany(db.messageRecipient, {
    foreignKey: "id_recipient",
    onDelete: "CASCADE",
    as: "recipient",
});
db.messageRecipient.belongsTo(db.user, {
    foreignKey: "id_recipient",
    as: "recipient",
});

// Console log
// index.js (or equivalent)
console.log("User Associations:", db.user.associations);
console.log("");

console.log(
    "Teaching Schedule Associations:",
    db.teachingSchedule.associations
);
console.log("");

console.log(
    "UserTeachingSchedule Associations:",
    db.userTeachingSchedule.associations
);
console.log("");

console.log(
    "Teaching Attendance Associations:",
    db.teachingAttendance.associations
);
console.log("");

console.log("Teaching Payroll Associations:", db.teachingPayroll.associations);
console.log("");

// console.log("Transport Associations:", db.transport.associations);
// console.log("");

// console.log("Reimbursement Associations:", db.reimbursement.associations);
// console.log("");

// console.log("PrivateTransport Associations:", db.privateTransport.associations);
// console.log("");

// console.log("PrivateTransportData Associations:", db.privateTransportData.associations);
// console.log("");

// console.log("PublicTransport Associations:", db.publicTransport.associations);
// console.log("");

// console.log("PublicTransportData Associations:", db.publicTransportData.associations);
// console.log("");

console.log("Office Attendance Associations:", db.officeAttendance.associations);
console.log("");

console.log("Office Payroll Associations:", db.officePayroll.associations);
console.log("");

module.exports = db;
