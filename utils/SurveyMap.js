'use strict';

var SurveyMap = {
  'prevention':{
     'qp0': {
       'value':'Explain your story?',
       'answers':{}
     },
     'qp0.1':{
       'value':'What is the amount of your need?',
       'answers':{}
     },
     'qp1': {
        'value':'How can I help?',
        'answers':['utilities(1)','groceries(2)','legal(3)','medical(4)']
     },
     'qp1.1':{
        'value':'Are you having trouble paying your electric bill?',
        'answers':['yes', 'no']
     },
     'qp1.2':{
        'value':'Are you having trouble paying for your groceries?',
        'answers':['yes', 'no']
     },
     'qp1.3':{
        'value':'Do you need legal assistance?',
        'answers':['yes', 'no']
     },
     'qp1.4':{
        'value':'Do you need medical assistance?',
        'answers':['yes', 'no']
     },
     'qp2':{
        'value':'What is your birthday?',
        'answers':{}
     },
     'qp3':{
        'value':'What kind of id do you have?',
        'answers':['Drivers License(1)', 'SSN(2)', 'State Id(3)', 'Other(4)']
     },
     'qp4':{
        'value':'Would you like to publicly raise funds?',
        'answers':['yes','no']
     },
     'qp5':{
       'value':'What is your address?',
       'answers':{}
     }
   },
   'diversion':{
     'qd0':{
       'value':'Are you in danger?',
       'answers':['yes', 'no']
     },
     'qd1':{
       'value':'Do you need medical attention?',
       'answers':['yes', 'no']
     },
     'qd2':{
       'value':'Do you have a place to stay?',
       'answers':['yes', 'no']
     },
     'qd3':{
       'value':'Can you stay with family and friends?',
       'answers':['yes', 'no']
     },
     'qd4':{
       'value':'Give us the nearest cross street',
       'answers':{}
     },
     'qp5':{
        'value':'What is your birthday?',
        'answers':{}
     },
     'qp6':{
        'value':'What kind of identification do you have?',
        'answers':['Drivers License(1)', 'SSN(2)', 'State Id(3)', 'Other(4)']
     }
   }
  }

module.exports = SurveyMap;
