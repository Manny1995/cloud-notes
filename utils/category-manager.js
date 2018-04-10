// Immanuel Amirtharaj
// category-manager.js

const ClassModel = require('../models/Class');


module.exports.getCategories = function(next) {

    ClassModel.find(null, function(err, allClasses) {
        if (err) {
            next(err);
        }
        else {
            next(err, allClasses);
        }
    });
}

module.exports.incrementCategory = function(className, next) {

    ClassModel.findOne({title : className}, function(err, foundClass) {
        if (err) {
            next(err);
        }
        else {
            if (foundClass) {
                const newCount = foundClass.numDocuments + 1;
                ClassModel.updateOne({numDocuments : newCount}, function(updateErr) {
                    if (updateErr) {
                        next(updateErr);
                    }
                    else {
                        next(null);
                    }
                });
            }
            else {
                const newClass = new ClassModel({
                    title : className,
                    numDocuments : 1,
                });
                
                newClass.setQueryTitle(className);

                newClass.save(function(saveErr) {
                    if (saveErr) {
                        next(saveErr);
                    }
                    else {
                        next(null);
                    }
                });
            }
        }
    });
}

module.exports.decrementCategory = function(className, next) {

    ClassModel.findOne({title : className}, function(err, foundClass) {
        if (err) {
            next(err);
        }
        else {
            if (foundClass) {
                const newCount = foundClass.numDocuments - 1;

                if (newCount == 0) {
                    ClassModel.deleteOne({title : className}, function(deleteErr) {
                        if (deleteErr) {
                            next(deleteErr);
                        }
                        else {
                            next(null);
                        }
                    })
                }
                else {
                    ClassModel.updateOne({numDocuments : newCount}, function(updateErr) {
                        if (updateErr) {
                            next(updateErr);
                        }
                        else {
                            next(null);
                        }
                    });
                }
            }
            else {
                next(null);
            }
        }
    });
}
