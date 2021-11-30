const express = require("express");

// recordRoutes is an instance of the express router.
// use it to define routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// connect to database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// GET a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("EmployeeDB");
  db_connect
    .collection("employees")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// GET a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("employees")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// GET a record by firstname (ascending)
recordRoutes.route("/record/firstname/:firstName").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { firstName: req.params.firstName };
  db_connect
      .collection("employees")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// GET a record by lastname (ascending)
recordRoutes.route("/record/lastname/:lastName").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { lastName: req.params.lastName };
  db_connect
      .collection("employees")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// GET a record by department (ascending)
recordRoutes.route("/record/department/:department").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { department: req.params.department };
  db_connect
      .collection("employees")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// GET a record by birthdate (ascending)
recordRoutes.route("/record/birthdate/:birthdate").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { birthdate: req.params.birthdate };
  db_connect
      .collection("employees")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// GET a record by costcenter (ascending)
recordRoutes.route("/record/costcenter/:costcenter").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { costCenter: req.params.costCenter };
  db_connect
      .collection("employees")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// Create a new record.
// recordRoutes.route("/record/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     person_name: req.body.person_name,
//     person_position: req.body.person_position,
//     person_level: req.body.person_level,
//   };
//   db_connect.collection("employees").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// Update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId( req.params.id )};
//   let newvalues = {
//     $set: {
//       person_name: req.body.person_name,
//       person_position: req.body.person_position,
//       person_level: req.body.person_level,
//     },
//   };
//   db_connect
//     .collection("employees")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
// });

// DELETE a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("employees").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;
