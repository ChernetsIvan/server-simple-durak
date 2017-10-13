var ObjectID = require("mongodb").ObjectID;
var PlayerModel = require("./../models/PlayerModel");

const errorMsg = { error: "An error has occured" };
const collectionName = "players";

module.exports = function(app, db) {
  app.get("/players", (req, res) => {
    db
      .collection(collectionName)
      .find()
      .toArray((err, items) => {
        if (err) {
          res.send(errorMsg);
        } else {
          res.send(items);
        }
      });
  });

  app.get("/players/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection(collectionName).findOne(details, (err, item) => {
      if (err) {
        res.send(errorMsg);
      } else {
        res.send(item);
      }
    });
  });

  app.delete("/players/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    db.collection(collectionName).remove(details, (err, item) => {
      if (err) {
        res.send(errorMsg);
      } else {
        res.send(`Player ${id} is deleted!`);
      }
    });
  });

  app.post("/players", (req, res) => {
    const player = new PlayerModel(
      req.body.playerName,
      req.body.wins,
      req.body.draws,
      req.body.fails
    );
    db.collection(collectionName).insert(player, (err, result) => {
      if (err) {
        res.send(errorMsg);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/players/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectID(id) };
    const player = new PlayerModel(
      req.body.playerName,
      req.body.wins,
      req.body.draws,
      req.body.fails
    );
    db.collection(collectionName).update(details, player, (err, result) => {
      if (err) {
        res.send(errorMsg);
      } else {
        res.send(player);
      }
    });
  });
};
