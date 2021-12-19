const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req);

  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
  // res.writeHead(200, { "Content-Type": "application/csv" });

  res.write('Hola mundo');
  res.end();
});

server.listen(8080);

console.log("Escuchando el puerto", 8080);
