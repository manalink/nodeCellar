var http = require('http');
http.createServer(function(req,resp){
	resp.writeHead(200,{'Content-Type':'text/plain'});
	resp.end('Hello World');
}).listen(3000,'127.0.0.1');
console.log('Server running at http://127.0.0.1:3000');