var os = require("os");


const constants = {
    PORT : (process.env.PORT || 3001),
    MONGO_URI : process.env.MONGOLAB_URI || 'mongodb://localhost/CloudNotes',
    ADMIN_USERNAME : process.env.ADMIN_USERNAME || 'manny',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'supersecret',
    BASE_FILE_DIR : '/public',
    BASE_URL : os.hostname()+'/',
    AWS_KEY : process.env.AWS_KEY|| 'invalid username',
    AWS_SECRET : process.env.AWS_SECRET || 'invalid key',
};

console.log(constants);
module.exports = constants;