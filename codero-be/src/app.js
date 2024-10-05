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
const schoolCentreRoutes = require('./routes/schoolcentre.routes.js');
const studentRoutes = require('./routes/student.routes.js');
const messageRoutes = require('./routes/message.routes.js');
const materiRoutes = require('./routes/materi.routes.js');
const pertemuanRoutes = require('./routes/pertemuan.routes.js');
// const scheduleRoutes = require('./routes/schedule.routes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/schoolcentres', schoolCentreRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/materi', materiRoutes);
app.use('/api/pertemuan', pertemuanRoutes);
// app.use('/api/schedules', scheduleRoutes);

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application.' });
})

// Set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})