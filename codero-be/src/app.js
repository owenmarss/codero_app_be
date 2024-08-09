const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

const db = require('./models');
db.sequelize.sync();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/user.routes.js');
const schoolCentreRoutes = require('./routes/schoolcentre.routes.js');

// const scheduleRoutes = require('./routes/schedule.routes');

app.use('/api/users', userRoutes);
app.use('/api/schoolcentres', schoolCentreRoutes);
// app.use('/api/schedules', scheduleRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my application.' });
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})