var fs = require ("fs");
var http = require ("http");

http
.createServer ((req, res) => {

    fs.readFile (`/images ${req.url}_doge.jpg`, (err, data) =>
    {
        if (err) {
            res.writeHead (404, {"content-type": "text/plain"});
            return res.end ("image not found\n")
        }
            else {
                res.writeHead (200, {"content-type": "image/jpg"});
            return res.end (data)
        };
    })
})
.listen (1337, "localhost")




