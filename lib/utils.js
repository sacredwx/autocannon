const fs = require('fs')
const json = require('big-json')

module.exports = {
  splitArray: (array, chunkSize) => {
    let i; let j; let temparray; const result = []
    for (i = 0, j = array.length; i < j; i += chunkSize) {
      temparray = array.slice(i, i + chunkSize)
      result.push(temparray)
    }
    return result
  },

  readStreamJSONFile: filePath => {
    return new Promise((resolve, reject) => {
      const parseStream = json.createParseStream()

      parseStream
        .on('data', resolve)
        .on('error', reject)

      fs.createReadStream(filePath).pipe(parseStream)
    })
  }
}
