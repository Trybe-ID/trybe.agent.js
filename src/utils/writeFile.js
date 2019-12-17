const fs = require('fs');

const writeFile = (location, content) => {
  return new Promise((resolve, reject) => {
      fs.writeFile(location, content, function(err) {
          if(err) {
              reject(err)
          } else {
              resolve(location)
          }
      })
  })
} 

module.exports = writeFile;
