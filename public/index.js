const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Download this from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com', // Replace with your database URL
});

const db = admin.firestore();



//Connect to database
connectDB();

app.use(express.json({ extented: false }));// allows us to accept json data into our api
app.use(cors());

// Define Routes
app.use(express.static(__dirname + '/FrontEnd'));
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname + 'index.html'));
});

app.use('/api/url', require('./routes/url'));

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}
The Server is: http://localhost:${PORT}`));

