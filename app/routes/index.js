const playerRoutes = require("./playerRoutes");
module.exports = function(app, db){
  playerRoutes(app, db);
}