const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();



app.use(cors);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./models");
const Role = db.role;

db.sequelize.sync().then(() => {
    console.log('Drop and Resync Db');
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to project 7 application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});