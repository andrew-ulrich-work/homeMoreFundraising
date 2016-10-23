const enumRefsObject = require('./json/enumRefs.json');

const DATE_REGEX='/[2][0][01][0-6]-1[0-2]-[1-2][0-9]/';
const DATE_TIME_REGEX='/[2][0][01][0-6]-1[0-2]-[1-2][0-9][ ][0-1][0-2]:[0-5]\\d:[0-5]\\d/';
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
						"minimum": 0,
						"maximum": 10
					},
					"amountNeeded": {
						"type": "integer",
						"minimum": 10,
            "maximum": 200
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
					}
				},
        "required":["title","text","amountRaised","amountNeeded","dueDate","createDate","contributors"]
			}
		}
	},
  "required":["_id","fakeName","description","followers","stories"]
};
const otherSchema={
  type:'object',
  properties:{
    'DOB':{
      type:'string',
      pattern:'[1][5-9]\d\d-1[0-2]-[1-2][0-9]'
    },
    'MiddleName':{
      type:'string',
      enum:['Aaron','Abbey','Abbie','Abby','Abigail','Ada','Adah','Adaline','Adam','Addie','Adela','Adelaida','Adelaide','Adele','Adelia','Adelina','Adeline','Adell','Adella','Adelle','Adena','Adina','Adria','Adrian','Adriana','Adriane','Adrianna','Adrianne','Adrien','Adriene','Adrienne','Afton','Agatha','Agnes','Agnus','Agripina','Agueda','Agustina','Ai','Aida','Aide','Aiko','Aileen','Ailene','Aimee','Aisha','Aja','Akiko','Akilah','Alaina','Alaine','Alana','Alane','Alanna','Alayna','Alba','Albert','Alberta','Albertha','Albertina','Albertine','Albina','Alda','Alease','Alecia','Aleen','Aleida','Aleisha','Alejandra','Alejandrina','Alena','Alene','Alesha','Aleshia','Alesia','Alessandra','Aleta','Aletha','Alethea','Alethia','Alex','Alexa','Alexander','Alexandra','Alexandria','Alexia','Alexis','Alfreda','Alfredia','Ali','Alia','Alica','Alice','Alicia','Alida','Alina','Aline','Alisa','Alise','Alisha','Alishia','Alisia','Alison','Alissa','Alita','Alix','Aliza','Alla','Alleen','Allegra','Allen']
    },
    'FirstName':{
      type:'string',
      enum:["Anne","Marie","Claire","Stella","Georgia","Virginia","Isabelle","Florence","Jane","Wanda","Ellen","Jenna","Rebecca","Sarah","Elizabeth","Bethany"]
    },
    'LastName':{
      type:'string',
      enum:['Rendon','Renfro','Renner','Reno','Renteria','Reyes','Reyna','Reynolds','Reynoso','Rhea','Rhoades','Rhoads','Rhodes','Ricci','Rice','Rich','Richard','Richards','Richardson','Richey','Richie','Richmond','Richter','Rickard','Ricker','Ricketts','Rickman','Ricks','Rico','Riddick','Riddle','Ridenour','Rider','Ridgeway','Ridley','Rife','Rigby','Riggins','Riggs','Rigsby','Riley','Rinaldi','Rinehart','Ring','Rios','Ripley','Ritchey','Ritchie','Ritter','Rivas','Rivera','Rivers','Rizzo','Roach','Roark','Robb','Robbins','Roberge','Roberson','Robert','Roberts','Robertson','Robinette','Robins','Robinson','Robison','Robles','Robson','Roby','Rocha','Roche','Rock','Rockwell','Roden']
    },
    'phone':{
      type:'string',
      pattern:'[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}'
    }
  },
  required:['DOB','MiddleName','FirstName','LastName','phone']
};

//has the following fields:
//DE#,Name,Type,List,Null,Notes
//following types: D=date, T=dateTime,I=Integer,M=Money,M+=positive money,S#=string
function makeSchema(jsonDescription) {
  var schema={
    type:"object",
    properties:{},
    required:[]
  }
  jsonDescription.forEach((rowDescript)=>{
    var innerSchema={};
    if(rowDescript.Type=='D') {
      innerSchema.type='string',
      innerSchema.pattern=DATE_REGEX;
    } else if(rowDescript.Type=='T') {
      innerSchema.type='string',
      innerSchema.pattern=DATE_TIME_REGEX;
    } else if(rowDescript.Type.indexOf('S')==0) {
      innerSchema.type='string',
      innerSchema.maxLength=parseInt(rowDescript.Type.substring(1));
      switch(rowDescript.Name) {
        case 'SourceContactPhone':
          innerSchema.pattern='/[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}/';
          break;
        case 'SourceContactExtension':
          innerSchema.pattern='[0-9]{1,5}';
          break;
        case 'SourceContactEmail':
          innerSchema.pattern='/(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\\-+)|([A-Za-z0-9]+\\.+)|([A-Za-z0-9]+\\++))*[A-Za-z0-9]+@((\\w+\\-+)|(\\w+\\.))*\\w{1,63}\\.[a-zA-Z]{2,6}/'
          break;
      }
    } else if(rowDescript.Type=='I') {
      innerSchema.type='integer';
      if(rowDescript.List) {
        var enumObj = enumRefsObject[rowDescript.Name];
        if(rowDescript.List=='1.7') {
          enumObj = enumRefsObject['No/Yes/Missing'];
        } else if(rowDescript.List=='1.8') {
          enumObj = enumRefsObject['No/Yes/Reasons for Missing Data'];
        }
        
        innerSchema.enum=[];
        for(var val in enumObj) {
          innerSchema.enum.push(val);
        }
      }
    }
    
    schema.properties[rowDescript.Name]=innerSchema;
    if(rowDescript.Null!='Y') {
      schema.required.push(rowDescript.Name);
    }
  });
  return schema;
}

const faker = require('json-schema-faker');
function makeFakeData(jsonDescription) {
  var schema=makeSchema(jsonDescription);
  var schemaString = JSON.stringify(schema,null,2).replace('/','');
  var fakeData=faker(schema);
  var moreFakeData=faker(otherSchema);
  if(fakeData['DOB']) {
    for(var key in moreFakeData) {
      fakeData[key]=moreFakeData[key];
    }
    for(var key in atRiskResponse) {
      fakeData[key]=moreFakeData[key];
    }
  }
  
  return fakeData;
}

function makeFormSchema(jsonDescription) {
  var schema=makeSchema(jsonDescription);
  formSchema={
    schema:schema.properties,
    form:[]
  }
  jsonDescription.forEach((rowDescript)=>{
    var innerSchema={
      key:rowDescript.Name
    };
    if(rowDescript.Type=='D') {
      innerSchema.type='date';
    } else if(rowDescript.Type=='T') {
      innerSchema.type='datetime-local';
    } else if(rowDescript.Type.indexOf('S')==0) {
      innerSchema.type='text';
      switch(rowDescript.Name) {
        case 'SourceContactPhone':
          innerSchema.type='tel';
          break;
        case 'SourceContactEmail':
          innerSchema.type='email'
          break;
      }
    } else if(rowDescript.Type=='I') {
      var enumObj = enumRefsObject[rowDescript.Name];
        if(rowDescript.List=='1.7') {
          enumObj = enumRefsObject['No/Yes/Missing'];
          innerSchema.titleMap= enumObj;
        } else if(rowDescript.List=='1.8') {
          enumObj = enumRefsObject['No/Yes/Reasons for Missing Data'];
          innerSchema.titleMap= enumObj;
        } else {
          innerSchema.type='number';
        }
      
    }
    
    formSchema.form.push(innerSchema);
  });
  return formSchema;
}

module.exports={
  makeSchema:makeSchema,
  makeFakeData:makeFakeData,
  makeFormSchema:makeFormSchema
}