const express = require('express'); // I save the 'express' module in a variable so I can refer/use to express functions later on
const mongoose = require('mongoose'); // I save the 'mongoose' module in a variable so I can refer/use to mongoose functions later on
const bodyParser = require('body-parser'); // I save the 'body-parser' module in a variable so I can refer/use to body-parser functions later on
const passport = require('passport');

const users = require('./routes/api/users');

const app = express(); // This express function creates an express application that I save in a variable so I can refer to it later on  

// Body-parser middleware 
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
// I get the mongoURI setup in the config/keys.js file and save it in a variable
const db = require("./config/keys").mongoURI;

// I try to open a connection to MongoDB using mongoose
mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Tries to connect to the database using the 'db' variable containing our mongoURI from 'keys.js' file 
.then(() => console.log("Connection to MongoDB established!")) // If it goes through, I write a succcess message in the console
.catch(err => console.log(err)); // If there is an error during the connection process, I write the error in the console
// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use("/api/users", users);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// I setup the port I want to deploy my app on, so I specify Heroku's port here and a default port in case I want to use another port anytime
const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Sever up and running on port ${port}!`));