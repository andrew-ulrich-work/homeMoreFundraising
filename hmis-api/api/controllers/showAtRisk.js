'use strict';
var faker = require('json-schema-faker');
const MongoClient = require('mongodb').MongoClient;
// faker.format('name', function(gen, schema) {
  // return gen.faker.name.firstName();
// });
// faker.format('title', function(gen, schema) {
  // return gen.faker.hacker.phrase();
// });

var atRiskResponse = {
	"type": "object",
	"properties": {
    "_id":{
      "type":"string",
      "pattern":"[\d\w]{30}",
    },
    "fakeName": {
			"type": "string",
			"enum":["Anne","Marie","Claire","Stella","Georgia","Virginia","Isabelle","Florence","Jane","Wanda","Ellen","Jenna","Rebecca","Sarah","Elizabeth","Bethany"]
		},
		"description": {
			"type": "string",
			"maxLength": 40,
      "enum":["Single Mother of 2","Single mother of 1","Survivor of Domestic Violence","Recent Immigrant","Elderly with health issues","suffers from chronic pain","suffers from chronic disease","recently divorced","trying to rebuild after rehab"]
		},
		"followers": {
			"type": "array",
			"items": {
				"type": "string",
				"enum":["Anne","Marie","Claire","Stella","Georgia","Virginia","Isabelle","Florence","Jane","Wanda","Ellen","Jenna","Rebecca","Sarah","Elizabeth","Bethany"]
			}
		},
		"stories": {
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
          "title": {
						"type": "string",
            "enum":['Electricity Bills', 'Overdue Bills', 'Legal Fees','Medical Fees', 'Educational Loans', 'Food Shortage']
					},
					"text": {
						"type": "string",
            "enum":['I can’t seem to get back on track and resort to substances abuse to destress', 'My parents need assistance since my mom just had a stroke and I just can’t see to make ends meet', 'If I can just pay this month\'s bill, next month my brother said he would hook me up with a job', 'My one year old kid needs surgery and that’s pretty much going to bankrupt me', 'I have a mental disorder that prevents me from communicating face to face in a meaningful way, and that prevents me from getting a job most of the time']
					},
					"amountRaised": {
						"type": "integer",
						"minimum": 50,
						"maximum": 150
					},
					"amountNeeded": {
						"type": "integer",
						"minimum": 150,
            "maximum": 250
					},
					"dueDate": {
						"type": "integer",
						"minimum": 1477183160,
            "maximum": 1477958400
					},
          "createDate":{
						"type": "integer",
						"minimum": 1476942072,
            "maximum": 1477183160
					},
				},
        "required":["title","text","amountRaised","amountNeeded","dueDate","createDate","contributors"]
			},
      "minItems": 4,
      "maxItems": 7
		}
	},
  "required":["_id","fakeName","description","followers","stories"]
}
module.exports = {
  showAllAtRisk: showAllAtRisk,
  show:show
};

function show(req,res) {
//var fakeData=faker(atRiskResponse);
var id =req.swagger.params._id.value;
  MongoClient.connect('mongodb://master:globalhack6@ds063946.mlab.com:63946/globalhack',(err,db)=>{
    db.collection('atrisk').find({_id:id},(err,result)=>{
      if(result) {
        result.forEach((doc)=>{
          res.json(doc);
        });
      }
    })
  })
  //res.json(fakeData);
}

function showAllAtRisk(req,res) {
//var fakeData=[];
// for(var i =0; i< 10; i++) {
  // var fakeRecord=faker(atRiskResponse)
  //fakeRecord.fakeName=faker.name.firstName();
  //fakeRecord.stories.forEach((story)=>{ story.title=faker.hacker.phrase(); });
  // fakeData.push(fakeRecord);
// }
MongoClient.connect('mongodb://master:globalhack6@ds063946.mlab.com:63946/globalhack',(err,db)=>{
    db.collection('atrisk').find({},(err,result)=>{
      if(result) {
        result.toArray((err,stuff)=>{
          console.log(stuff);
          res.json(stuff);
        });
      }
    })
  })
  //res.json(fakeData);
}