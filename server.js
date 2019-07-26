const http = require('http');
const app = require('./lib/app');
require('./lib/util/connect')();

const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('server started on port', server.address().port);
});