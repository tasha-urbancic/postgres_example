const pg = require("pg");
const db = require("./db");
const personsName = process.argv.slice(2)[0];

function printPerson(personObject, i) {
  console.log(
    `- ${i + 1}: ${personObject.first_name} ${personObject
      .last_name}, born '${personObject.birthdate}'`
  );
}

function printFindNameResults(result) {
  console.log(
    `Found ${result.rows.length} person(s) by the name '${personsName}':`
  );
  result.rows.forEach(printPerson);
}

function findFamousPeopleByName(done) {
  db.connect((error, client) => {
    console.log("Searching ...");
    const queryText =
      "SELECT  id, first_name, last_name, to_char(birthdate,'YYYY-MM-DD') as birthdate FROM famous_people WHERE first_name = $1::text OR last_name = $1::text";
    client.query(queryText, [personsName], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      done(result);
      db.close(client);
    });
  });
}

findFamousPeopleByName(printFindNameResults);
