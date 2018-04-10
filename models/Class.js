// Immanuel Amirtharaj
// Class.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classInfo = {
    title : String,
    queryTitle : String,
    numDocuments : Number,
};

ClassSchema = new Schema(classInfo);


ClassSchema.methods.setQueryTitle = function(queryTitle) {
    let trimmedQuery = queryTitle.trim();
    let dashedQuery = trimmedQuery.replace(/\s+/g, '-').toLowerCase();

    this.queryTitle = dashedQuery;
    this.title = trimmedQuery;
    
};

module.exports = mongoose.model('Class', ClassSchema);