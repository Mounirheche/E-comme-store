const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server = http.createServer((req, res) => {
  let filePath = path.join('d:/ecostore', req.url === '/' ? '/index.html' : req.url);
  filePath = filePath.split('?')[0];
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + filePath); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, {'Content-Type': mime[ext] || 'text/plain', 'Access-Control-Allow-Origin':'*'});
    res.end(data);
  });
});
server.listen(3000, () => console.log('Server running on http://localhost:3000'));
