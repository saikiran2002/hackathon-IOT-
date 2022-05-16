const express = require('express');
var cors = require('cors')
// const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8090;
// var serviceAccount = require('./admin.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://project-id.firebaseio.com",
//     authDomain: "project-id.firebaseapp.com",
// });

// Parsers
app.use(express.json())
app.options('*', cors()) // include before other routes
app.use(cors({ allowedHeaders: 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Origin,Access-Control-Allow-Headers', preflightContinue: true }));
// app.use(cookieParser());

// DB Connection
mongoose
    .connect(`mongodb+srv://hacker101:${process.env.db_pwd}@cluster0.b3ezf.mongodb.net/iot_h_db?retryWrites=true&w=majority`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then((a) => {
        console.log('DB Connected...')
        server_status = 'online'
    })
    .catch((e) => {
        console.error(e)
        server_status = 'offline'
    })

app.use(express.static('public'));

app.use('/api', require('./router.js'))

app.listen(PORT, '0.0.0.0', () => {
    console.log('Running on PORT: ' + PORT);
})