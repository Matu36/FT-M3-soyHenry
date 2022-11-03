var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor

function readFile (fileName) {
  return new Promise ((resolve, reject) => {
    fs.readFile ('./images/' + fileName + '.jpg', (err, data) => {
      console.log ('FILE PATH', './images/' + fileName);
      if (err) reject ({
        data: '<h1> No encontrada </h1>',
        contentTyoe: 'text/html',
        status: 404
      })
      else resolve ({
data,
contentType: 'image/jpg',
status: 200

      })
    });
 })
}

http.createServer((req, res) => {
console.log (req.url.split ('/', 2).pop ());
readFile (req.url.split ('/', 2).pop ())
.then ((img) => {
  res.writeHead (img.status, {'content-Type': img.contentType})
  return res.end (img.data)
})
.catch((err) => {
  res.writeHead (err.status, {'content-Type': err.contentTyoe})
  return res.end(err.data)
})
})
.listen (1337, '127.0.0.1', () => console.log ('Listening to port 1337')) 
