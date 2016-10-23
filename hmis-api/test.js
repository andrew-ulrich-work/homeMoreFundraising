var makeSchema = require('./makeSchema.js');
var enrollment=require('./json/enrollment');

var schema=makeSchema.makeFormSchema(enrollment);
console.log(JSON.stringify(schema,null,2));