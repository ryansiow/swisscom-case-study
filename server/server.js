const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const userEnv = process.env.USR;
const pwdEnv = process.env.PASSWORD;

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

var path = require('path');


function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);

    if (!authheader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }

    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    if (user == userEnv && pass == pwdEnv) {

        // If Authorized user
        next();
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

}

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(cors({origin: '*'}));
app.use(express.json());

// First step is the authentication of the client
app.use(authentication)
app.use(express.static(path.join(__dirname, 'public')));


app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");



app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});
