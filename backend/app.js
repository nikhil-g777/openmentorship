const fs = require('fs');
const https = require('https');
const app = require('./server');

if (process.env.NODE_ENV == 'local' || process.env.NODE_ENV == 'test') {
  app.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
  });
} else {
  const key = fs.readFileSync('./certs/private.key');
  const cert = fs.readFileSync('./certs/certificate.crt');
  const options = {
    key,
    cert,
  };

  const server = https.createServer(options, app);

  server.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on port ${process.env.APP_PORT}!`);
  });
}

module.exports = app;
