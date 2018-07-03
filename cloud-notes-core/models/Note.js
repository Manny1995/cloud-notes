// Immanuel Amirtharaj
// Note.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteInfo = {
    title : String,
    category : String,
    queryTitle : String,
    filepath : String,
};

NoteSchema = new Schema(noteInfo);

NoteSchema.methods.setQueryTitle = function(queryTitle) {
    let trimmedQuery = queryTitle.trim();
    let dashedQuery = trimmedQuery.replace(/\s+/g, '-').toLowerCase();

    this.queryTitle = dashedQuery;
    this.category = trimmedQuery;
    
};

// 1235w33.pdf
NoteSchema.methods.generateFilePath = function(extension) {
    this.filepath = this._id + '.' + extension;
};

module.exports = mongoose.model('Note', NoteSchema);