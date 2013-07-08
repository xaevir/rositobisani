var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
    port = process.argv[2] || 9999;
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
        if(!exists) {
            console.log("not exists: " + filename);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
            return
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type':mimeType});

        var fileStream = fs.createReadStream(filename);

        // This will wait until we know the readable stream is actually valid before piping
        fileStream.on('open', function () {
          // This just pipes the read stream to the response object (which goes to the client)
          fileStream.pipe(res);
        });

        // This catches any errors that happen while creating the readable stream (usually invalid names)
        fileStream.on('error', function(err) {
          console.log(err);
          res.end();
        });



    }); //end path.exists
}).listen(9999);

console.log("Static file server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");
