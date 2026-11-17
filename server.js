const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db-1794407259350.json'));
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT value: ${process.env.PORT}`);
}

server.use(jsonServer.defaults());
server.use(router);
server.listen(port, '0.0.0.0', () => {
    console.log(`JSON Server is running on port ${port}`);
});
