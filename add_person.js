const firstName = process.argv.slice(2)[0];
const lastName = process.argv.slice(2)[1];
const birthdate = process.argv.slice(2)[2];

const settingsKnex = require("./settings_knex");
const knex = require("knex")(settingsKnex);

function formatDate(date) {
  const javascriptDate = new Date(date);
  return javascriptDate.toUTCString();
}

function addPerson(done) {
  console.log("Adding ...");

  knex("famous_people")
    .insert({first_name: firstName, last_name: lastName, birthdate: formatDate(birthdate)})
    .asCallback((err, rows) => {
      if (err) {
        return console.error("error running query", err);
      }
      done();
    });
}

addPerson(() => {
  console.log('person added');
  process.exit();
});
