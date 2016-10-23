const MongoClient = require('mongodb').MongoClient;
const makeSchema = require('./makeSchema');
const fs=require('fs');
var collections=[
'site',
'affiliation',
'client',
'disabilities',
'employmentEducation',
'enrollment',
'enrollmentcoc',
'exit',
'export',
'funder',
'healthanddv',
'incomebenefits',
'inventory',
'organization',
'project',
'projectcoc',
'services'
];
var colsToIdName={
'organization':'OrganizationID',
'project':'ProjectID',
'projectcoc':'CoCCode',
'client':'PersonalID',
'enrollment':'ProjectEntryID'
}
function replaceId(data,idName,collectionName) {
  console.log(collectionName)
  if(data[idName]) {
      var ids=JSON.parse(fs.readFileSync('./IDs/'+collectionName+'.json'));
      if(ids) {
        data[idName]=ids[Math.floor(Math.random()*ids.length-1)];
      }
    }
}

function makeData(numRecords,collection) {
  var returnData=[];
  for(var i=0;i<numRecords;i++) {
    var jsonDesc=require('./json/'+collection+'.json');
    var data=makeSchema.makeFakeData(jsonDesc);
    for(var col in colsToIdName) {
      replaceId(data,colsToIdName[col],col);
    }
    returnData.push(data);
  }
  return returnData;
}
collections.forEach((coll)=>{
  fs.writeFileSync('./fakeData/'+coll+'.json',JSON.stringify(makeData(10,coll),null,2));
});

function getIds() {}
MongoClient.connect('mongodb://master:globalhack6@ds063946.mlab.com:63946/globalhack',(err,db)=>{
  if(err) {
    reject(err);
  } else {
    // var organizationIds;
    // var projectIds;
    // var projectCoCIds;
    // var ClientIds;
    // var EnrollmentIds;
    // function insertOrg() {
      // var data =makeData(10,'organization');
      // db.collection('organization').find(')
    // }
    var callCount=0;
    collections.forEach((coll)=>{
      db.collection(coll).find({},(err,result)=>{
      var ids=[];
      result.forEach((row)=>{
       if(coll=='enrollment') console.log('"'+row._id+"\",")
        ids.push(row._id); 
      });
      //console.log(ids);
      //fs.writeFileSync('./IDs/'+coll+'.json',JSON.stringify(ids,null,2));
      if(callCount == collections.length) {
        db.close();
      } else {
        callCount++;
      }
    });
    });
    
  }
  db.close();
});