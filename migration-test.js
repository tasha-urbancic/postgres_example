// exports.up = function(knex, Promise) {
//   return Promise.all([
//     knex.schema.createTable("famous_people", function(table) {
//       table.increments("id");
//       table.string("first_name");
//       table.string("last_name");
//       table.dateTime("birthdate");
//     })
//   ]);
// };

// exports.down = function(knex, Promise) {
//   return Promise.all([
//     knex.schema.dropTable("users")
//   ]);
// };
