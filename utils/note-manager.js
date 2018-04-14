// Immanuel Amirtharaj
// note-manager.js

const decrementCategory = require('./category-manager');
const NoteModel = require('../models/Note');
const CategoryManager = require('./category-manager');


function formatNotes(notes) {
    const newNotes = notes.map((note) => {
        note.filepath = 'http://localhost:3001/' + note.filepath;
        return note;
    });

    return newNotes;
}

module.exports.getNotesForQuery = function(queryParams, next) {
    NoteModel.find(queryParams, function(err, notes) {
        if (err) {
            next(err, null);
        }
        else {
            next(null, formatNotes(notes));
        }
    });
}

module.exports.getNotesByCategory = function(categoryName, next) {
    NoteModel.find({category : categoryName}, function(err, notes) {
        if (err) {
            next(err, null);
        }
        else {

            next(null, formatNotes(notes));
        }
    });
}

module.exports.addNote = function(noteJSON, next) {

    const newNote = new NoteModel(noteJSON);
    newNote.setQueryTitle(noteJSON.category);
    newNote.save(function(err) {
        if (err) {
            next(err);
        }
        else {
            const categoryName = newNote.category;
            CategoryManager.incrementCategory(categoryName, function(incErr) {
                if (incErr) {
                    next(incErr);
                }
                else {
                    next(null);
                }
            });
        }
    });
}

module.exports.deleteNote = function(noteId, next) {
    NoteModel.findByIdAndRemove(noteId, function(err, deletedDoc) {
        if (err) {
            next(err);
        }
        else {

            if (deletedDoc == null) {
                next(null);
            }
            else {
                const category = deletedDoc.category;
                CategoryManager.decrementCategory(category, function(decErr) {
                    if (decErr) {
                        next(decErr);
                    }
                    else {
                        next(null);
                    }
                });
            }
        }
    });
}

module.exports.updateNote = function(noteId, noteJSON, next) {

    NoteModel.findByIdAndUpdate(noteId, noteJSON, function(err, oldDoc) {
        if (err) {
            next(err);
        }
        else {
            if (oldDoc.category != noteJSON.category) {
                CategoryManager.incrementCategory(noteJSON.category, function(incErr) {
                    if (incErr) {
                        next(incErr);
                    }
                    else {
                        CategoryManager.decrementCategory(oldDoc.category, function(decErr) {
                            if (decErr) {
                                next(decErr);
                            }
                            else {
                                next(null);
                            }
                        });                    }
                });
            }
            else {
                next(null);
            }
        }

    })
    NoteModel.updateOne(noteJSON, function(err, deletedDoc) {
        if (err) {
            next(err);
        }
        else {
            const category = deletedDoc.category;
            CategoryManager.decrementCategory(category, function(decErr) {
                if (decErr) {
                    next(decErr);
                }
                else {
                    next(null);
                }
            });
        }
    });
}

module.exports.formatNotesForGrid = function(notes, gridNumber) {
    res = [];
    for (let i = 0; i < notes.length; i=i+gridNumber) {
        let temp = [];
        for (let j = 0; j < gridNumber && i+j < notes.length; j++) {
            temp.push(notes[i+j]);
        }
        res.push(temp);
    }
    return res;
}
