'use strict';

var mongoose = require('mongoose');
const Response = mongoose.model('Response');
const SurveyMap = require('./SurveyMap.js');
const PREVENTION = 'PREVENTION';
const DIVERSION = 'DIVERSION';

var preventionArray = ['qp0', 'qp0.1', 'qp1', 'qp1.1', 'qp1.2', 'qp1.3', 'qp1.4', 'qp2', 'qp3', 'qp4', 'qp5'];
var diversionArray = ['q0', 'qd1', 'qd2', 'qd3', 'qd5', 'qd6'];

class SurveyManager {
  addResponse(phone, qId, text, cb) {
    var surveyType = '';
    if (preventionArray.indexOf(qId) != -1) {
      surveyType = 'PREVENTION';
    } else if (diversionArray.indexOf(qId) != -1) {
      surveyType = 'DIVERSION';
    }
    var resp = new Response({'phone':phone, 'qId':qId, 'response':text, 'surveyType':surveyType});

    resp.save(function(err, r) {
      if (err) {
        throw err;
      }
      cb(r);
    });
  }

  getResponseCount(phone, surveyType, cb) {
    Response.find({'phone':phone, 'surveyType':surveyType}, function(err, list) {
       cb(list.length);
    });    
  }

  getCurrentQuestionIdForResponse(phone, surveyType, cb) {
    Response.find({'phone':phone, 'surveyType':surveyType}, function(err, list) {
       var curpos = list.length;
       var result = 0;
       console.log('returning list size: ' + curpos);

       if (surveyType === PREVENTION) {
         result = preventionArray[curpos];
       } else if (surveyType === DIVERSION) {
         result = diversionArray[curpos];
       }

       cb(result);
    });
  }

  getNextQuestion(phone, surveyType, cb) {
     Response.find({'phone':phone, 'surveyType':surveyType}, function(err, list) {
        var curpos = list.length;
        var result = {};
        console.log('returning list size: ' + curpos);

        if (surveyType === PREVENTION) {
          var qId = preventionArray[curpos];
          result = SurveyMap.prevention[qId];
        } else if (surveyType === DIVERSION) {
          var qId = diversionArray[curpos];
          result = SurveyMap.diversion[qId];
        }
        // Since we're going to the database, callbacks/promises are required
        cb(result);
     });
  }
}

module.exports = SurveyManager;
