module.exports = {
  split_array: (array, chunkSize) => {
    let i; let j; let temparray; const result = []
    for (i = 0, j = array.length; i < j; i += chunkSize) {
      temparray = array.slice(i, i + chunkSize)
      result.push(temparray)
    }
    return result
  }
}
