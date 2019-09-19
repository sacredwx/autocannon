const fs = require('fs')

module.exports = {
  splitArray: (array, chunkSize) => {
    let i; let j; let temparray; const result = []
    for (i = 0, j = array.length; i < j; i += chunkSize) {
      temparray = array.slice(i, i + chunkSize)
      result.push(temparray)
    }
    return result
  },

  readStreamFile: (filePath) => {
    return new Promise((resolve, reject) => {
      const chunks = []

      fs.createReadStream(filePath)
        .on('data', chunk => chunks.push(chunk))
        .on('error', reject)
        .on('end', function () {
          resolve(Buffer.concat(chunks))
        })
    })
  }
}
