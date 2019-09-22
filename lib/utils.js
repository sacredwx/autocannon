const fs = require('fs')
const json = require('big-json')

module.exports = {
  splitArray: (array, chunks, arrayLength = array.length) => {
    const result = []
    for (let i = 0, j = 0; i < arrayLength; ++i, ++j) {
      process.stdout.write('\r' + i)
      if (j >= chunks) j = 0
      if (!result[j]) result[j] = []
      result[j].push(array[i])
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
