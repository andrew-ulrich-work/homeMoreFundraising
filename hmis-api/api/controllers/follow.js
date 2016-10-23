'use strict';
module.exports = {
  follow: follow
};

function follow(req,res) {
var id = req.swagger.params.id.value || ' ';
  res.end("You are now following "+id);
}