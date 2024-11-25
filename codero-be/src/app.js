const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

// Connect to database
const db = require('./models');
db.sequelize.sync();

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
const userRoutes = require('./routes/user.routes.js');
const partnerRoutes = require('./routes/partner.routes.js');
const studentRoutes = require('./routes/student.routes.js');
const scheduleRoutes = require('./routes/schedule.routes.js');
const userScheduleRoutes = require('./routes/user_schedule.routes.js');
const attendanceRoutes = require('./routes/attendance.routes.js');
const payrollRoutes = require('./routes/payroll.routes.js');
const messageRoutes = require('./routes/message.routes.js');
const curriculumRoutes = require('./routes/curriculum.routes.js');
const sessionRoutes = require('./routes/session.routes.js');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/user_schedules', userScheduleRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payrolls', payrollRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/session', sessionRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application.' });
})

// Set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})