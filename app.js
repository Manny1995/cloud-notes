// Immanuel Amirtharaj

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const NoteManager = require('./utils/note-manager');
const expressHandlebars = require('express-handlebars');

const path = require("path");

const app = express();


// engine
app.engine('hbs', expressHandlebars({
  defaultLayout: 'main.hbs', 
  layoutsDir : __dirname + '/views/layouts',
  extname: '.hbs',
}));

app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'hbs');


app.set('port', (process.env.PORT || 3000));
const mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/CloudNotes';


//bodyParser has to be loaded before calling the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



// set routes
const notesRoute = require('./routes/notes');
const classRoute = require('./routes/classes');

app.use('/api/notes', notesRoute);
app.use('/api/classes', classRoute);


// Connect to mongodb
mongoose.connect(mongoURI, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("Connection Successful!");
  }
});


app.get('/:className', function(req, res, next){
  console.log("Getting entries for a class name");

  NoteManager.getNotesByCategory(req.params.className, function(err, notes) {

    const formattedNotes = NoteManager.formatNotesForGrid(notes, 4);

    const blob = [
      [
        'a', 'a', 'a', 'a'
      ],
      [
        'a', 'a', 'a', 'a'
      ],
      [
        'a', 'a', 'a', 'a'
      ],

      [
        'a', 'a',
      ],
    ]
    res.render('index', {
        notes : blob,
        categories : ['Big Data', 'EMGT', 'Research'],
        currentCategory : req.params.className,
    });
  });
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