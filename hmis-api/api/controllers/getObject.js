'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var makeSchema = require('../../makeSchema');
/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  getObject: getObject,
  getObjectFormSchema:getObjectFormSchema,
  getObjectList:getObjectList
};

function getObject(req,res) {
  var objectName = req.swagger.params.objectName.value;
  if(objectName) {
    objectName=objectName.toLowerCase();
    var jsonDescription=require('../../json/'+objectName+'.json');
    var fakeData=makeSchema.makeFakeData(jsonDescription);
    res.json(fakeData);
  } else {
    res.json({});
  }
  
}
function getObjectFormSchema(req,res) {
  var objectName = req.swagger.params.objectName.value;
  if(objectName) {
    objectName=objectName.toLowerCase();
    var jsonDescription=require('../../json/'+objectName+'.json');
    var formSchema=makeSchema.makeFormSchema(jsonDescription);
    res.json(formSchema);
  } else {
    res.json({});
  }
  
}
function getObjectList(req,res) {
  res.json([
      "Enrollment",
      "Export",
      "Organization",
      "Project",
      "Funder",
      "ProjectCoC",
      "Inventory",
      "Aite",
      "Affiliation",
      "Client",
      "EnrollmentCoC",
      "Exit",
      "IncomeBenefits",
      "HealthAndDv",
      "EmploymentEducation",
      "Disabilities",
      "Services"
    ]);
}