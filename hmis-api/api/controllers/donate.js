'use strict';
const MongoClient = require('mongodb').MongoClient;
module.exports = {
  handleDonation: handleDonation
};

function handleDonation(req,res) {
  var id =req.swagger.params._id.value;
  var amount =parseInt(req.swagger.params.amount.value);
  MongoClient.connect('mongodb://master:globalhack6@ds063946.mlab.com:63946/globalhack',(err,db)=>{
    db.collection('donations').insert({amount:amount,clientId:id},(err,result)=>{
      db.collection('atrisk').find({_id:id},(err,result)=> {
        if(result && !err) {
          result.forEach((doc)=>{
            //console.log(doc);
            //res.json({message:"Thank you for your donation!"});
            db.collection('atrisk').update({_id:id},{"$set":{"stories.0.amountRaised":doc.stories[0].amountRaised+amount}},(err,result)=>{ res.json({message:"Thank you for your donation!"}); });
          })
          
        }
        console.log(err);
      });
      
      
    });
  });
  //res.json({message:"Thank you for your donation!"});
}