const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Connect to database
const db = require("./models");
db.sequelize.sync();

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
const userRoutes = require("./routes/user.routes.js");
const partnerRoutes = require("./routes/partner.routes.js");
const studentRoutes = require("./routes/student.routes.js");

const teachingScheduleRoutes = require("./routes/teaching_schedule.routes.js");
const userTeachingScheduleRoutes = require("./routes/user_teaching_schedule.routes.js");
const teachingAttendanceRoutes = require("./routes/teaching_attendance.routes.js");
const teachingPayrollRoutes = require("./routes/teaching_payroll.routes.js");

const messageRoutes = require("./routes/message.routes.js");
const curriculumRoutes = require("./routes/curriculum.routes.js");
const sessionRoutes = require("./routes/session.routes.js");
const path = require("path");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/partners", partnerRoutes);

app.use("/api/teaching_schedules", teachingScheduleRoutes);
app.use("/api/user_teaching_schedules", userTeachingScheduleRoutes);
app.use("/api/teaching_attendance", teachingAttendanceRoutes);
app.use("/api/teaching_payrolls", teachingPayrollRoutes);

app.use("/api/messages", messageRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/session", sessionRoutes);

// Default route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

app.get("/t", (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'images', 'test1.jpg');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err); // Log the error for debugging
            res.status(404).send('Image not found');
        }
    });
});

// app.use("/public", express.static(path.join(__dirname, "public")));

// Set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
