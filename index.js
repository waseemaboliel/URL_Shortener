const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const path = require('path');



//Connect to database
connectDB();

app.use(express.json({ extented: false }));// allows us to accept json data into our api
app.use(cors());

// Define Routes
app.use(express.static(__dirname + '/FrontEnd'));
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + 'main.html'));
});

app.use('/api/url', require('./routes/url'));

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

