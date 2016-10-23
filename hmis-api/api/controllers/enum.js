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
var enumRefsObject = require('../../json/enumRefs.json');
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
  getEnumByLabel: getEnumByLabel,
  getEnumList: getEnumList
};

function getEnumList(req,res) {
  var returnArray=[];
  for(var label in enumRefsObject) {
    returnArray.push(makeEnumResponse(label,enumRefsObject[label]));
  }
  res.json(returnArray);
}

function makeEnumResponse(label,enumRefObject) {
  var returnData={
      name:label,
      map:{}
    };
    for(var value in enumRefObject) {
      returnData.map[value]=enumRefObject[value];
    }
  return returnData;
}

function getEnumByLabel(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var label = req.swagger.params.label.value || 'stranger';
  var enumRefObject=enumRefsObject[label];
  var returnData={};
  if(enumRefObject) {
    returnData=makeEnumResponse(label,enumRefObject);
  }
  // this sends back a JSON response which is a single string
  res.json(returnData);
}

// function getEnumByLabelAndNumber(req, res) {
  // var label = req.swagger.params.label.value || 'stranger';
  // var number = req.swagger.params.number.value || 0;
  // var enumRefObject=enumRefsObject[label];
  // var returnData={};
  // if(enumRefObject) {
    // var value=enumRefObject[number];
    // returnData({value:value});
  // }
  // res.json(returnData);
// }
