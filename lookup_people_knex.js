const personsName = process.argv.slice(2)[0];

const settingsKnex = require("./settings_knex");
const knex = require("knex")(settingsKnex);

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(date);

  const formattedTime = year + "/" + month + "/" + day;
  return formattedTime;
}

function printPerson(personObject, i) {
  console.log(
    `- ${i +
      1}: ${personObject.first_name} ${personObject.last_name}, born '${formatDate(
      personObject.birthdate
    )}'`
  );
}

function printFindNameResults(rows) {
  console.log(`Found ${rows.length} person(s) by the name '${personsName}':`);
  rows.forEach(printPerson);
  process.exit();
}

function findFamousPeopleByName(done) {
  console.log("Searching ...");

  knex("famous_people")
    .select("id", "first_name", "last_name", "birthdate")
    .where("first_name", personsName)
    .orWhere("last_name", personsName)
    .asCallback((err, rows) => {
      if (err) {
        return console.error("error running query", err);
      }
      done(rows);
    });
}

findFamousPeopleByName(printFindNameResults);
