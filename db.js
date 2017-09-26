const pg = require('pg');

const settings = require("./settings");
const client = new pg.Client(settings);

module.exports = {
  connect: (done) => {
    client.connect((error) => {
      done(error, client);
    });
  },
  close: () => {
    client.end();
  }
};