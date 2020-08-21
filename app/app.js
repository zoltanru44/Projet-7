const express = require('express');
const bodyParser = require('body-parser');


const publicationRoutes = require('./routes/publication');
const userRoutes = require('./routes/user');
const path = require('path');
require('dotenv').config();

//Connexion to database Mongo DB
/*mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DBNAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));*/

//app is an express function
const app = express();

//headers to avoid CORS problems
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Send response as json objects
app.use(bodyParser.json());

//Image folder
app.use('/images', express.static(path.join(__dirname, 'images')));

//Use the router for user requests
app.use('/api/auth', userRoutes);

//Use the router for sauces requests
app.use('/api/publication', publicationRoutes);



module.exports = app;