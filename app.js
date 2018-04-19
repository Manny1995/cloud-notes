// Immanuel Amirtharaj

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const NoteManager = require('./utils/note-manager');

const path = require("path");

const app = express();

const cors = require('cors');
app.use(cors());
const constants = require('./config/constants');


app.set('port', constants.PORT);

const mongoURI = constants.MONGO_URI;


//bodyParser has to be loaded before calling the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// for serving files
app.use('/public', express.static('public'))

// set routes
const notesRoute = require('./routes/notes');
const classRoute = require('./routes/classes');

app.use('/api/notes', notesRoute);
app.use('/api/classes', classRoute);


var mongooseadmin = require('mongooseadmin');
app.use('/admin',mongooseadmin({
  authentication : (username, password, callback) => {
    console.log(username)
    console.log(password)
    callback(username == constants.ADMIN_USERNAME && password == constants.ADMIN_PASSWORD);
  },
}));


// Connect to mongodb
mongoose.connect(mongoURI, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Connection Successful!");
  }
});


app.get('/', function(req, res) {
  console.log("Getting entries for default home");
  res.render('index');
});

module.exports = app;


// Listen on port 3000
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});