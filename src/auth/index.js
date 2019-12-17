var path = require('path')

// Require everything in the utils dir
require('fs').readdirSync(__dirname).forEach((file) => {
    if (path.extname(file) === '.js') {
        exports[file.split('.')[0]] = require('./' + file);
    }
});