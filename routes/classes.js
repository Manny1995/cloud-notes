// Immanuel Amirtharaj
// notes.js

const express = require('express');
const NoteModel = require('../models/Note');
const NoteManager = require('../utils/note-manager');
const CategoryManager = require('../utils/category-manager');

const rf = require('../utils/response-formatter');

const router = express.Router();

router.get('/', function(req, res, next) {

    CategoryManager.getCategories(function(err, allCategories) {
        if (err) {
            res.sendjson(500, rf(500, err, null));
        }
        else {
            res.json(200, rf(200, err, allCategories));
        }
    });
});



module.exports = router;