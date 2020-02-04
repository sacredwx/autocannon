const fs = require('fs');
const json = require('big-json');

const inFile=process.argv[2]
const outFile=process.argv[3]

console.info("Loading Data")
 
const readStream = fs.createReadStream(inFile);
const parseStream = json.createParseStream();

try {
  fs.unlinkSync(outFile);
} catch(e) {}
fs.appendFileSync(outFile,'[');

parseStream.on('data', function(data) {
  data=Object.values(data);
  console.info("Data Loaded")
  const length=data.length
  let counter=1

  data.forEach(query=>{
    process.stdout.write(`[${counter++}/${length}]\r`);

    if(query.url) {
      let id=query.url.match(/\?id=([^&]*)&/);
      if(id) {
        query.url=query.url.replace(id[0],id[0].replace(/%2F/g,"-").replace(/%2B/g,"_"));
        query.url=query.url.replace(id[0],id[0].replace(/\//g,"-").replace(/\+/g,"_"));
      }

      id=query.url.match(/_wrapper_([^\.]*)\.xml/);
      if(id) {
        query.url=query.url.replace(id[0],id[0].replace(/%2F/g,"-").replace(/%2B/g,"_"));
        query.url=query.url.replace(id[0],id[0].replace(/\//g,"-").replace(/\+/g,"_"));
      }
    }
    
    fs.appendFileSync(outFile,JSON.stringify(query));
    if(counter!=length)
      fs.appendFileSync(outFile,',');

    return query;
  });

  fs.appendFileSync(outFile,']');

  process.stdout.write("\n\n");

  console.info("Done")
});
 
readStream.pipe(parseStream);