// Immanuel Amirtharaj
// notes.js

const express = require('express');
const NoteModel = require('../models/Note');
const NoteManager = require('../utils/note-manager');
const ClassModel = require('../models/Class');

const rf = require('../utils/response-formatter');

const router = express.Router();

const multer = require('multer');
const fs = require('fs');


function setQueryTitle(queryTitle) {
    let trimmedQuery = queryTitle.trim();
    let dashedQuery = trimmedQuery.replace(/\s+/g, '-').toLowerCase();
    return dashedQuery;    
};


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        console.log(req.body.category);
        const queryTitle = setQueryTitle(req.body.category);

        if (!fs.existsSync('public/' + queryTitle)){
            fs.mkdirSync('public/' + queryTitle);
        }



        cb(null, 'public/' + queryTitle + '/');
    },

    filename : function(req, file, next) {
        next(null, file.originalname);
    }
});

const upload = multer({
    storage : storage,
});

var path = require('path');

router.get('/:id', function(req, res, next) {

    NoteModel.findOne({_id : req.params.id}, function(err, post) {
        if (err) {
            res.json(500, rf(500, err, null));
        }
        else {
            let code = 200;
            if (post == null) {
                code = 404;
            }

            res.json(code, rf(code, null, post));
        }
    });
});

// Takes in query parameters
router.get('/', function(req, res, next) {

    let noteQuery = {};
    if (req.query.category) {
        noteQuery.queryTitle = req.query.category;
    }

    NoteManager.getNotesForQuery(noteQuery, function(err, notes) {
        if (err) {
            res.json(500, rf(500, err, null))
        }
        else {
            res.json(200, rf(200, null, notes));
        }
    });
});

router.post('/', upload.single('userFile'), function(req, res, next) {

    req.body.filepath = encodeURI(req.file.path);

    NoteManager.addNote(req.body, function(err) {
        if (err) {
            res.json(500, rf(err, err, null));
        }
        else {
            res.json(201, rf(201, null, null));
        }
    });

});

router.delete('/:id', function(req, res, next) {
    NoteManager.deleteNote({_id : req.params.id}, function(err) {
        if (err) {
            res.json(500, rf(500, err, null));
        }
        else {
            res.json(200, rf(200, null, null));
        }    
    });
});

module.exports = router;