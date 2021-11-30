const csvtojson = require('csvtojson');
const mongodb = require('mongodb');
require("dotenv").config({ path: "./config.env" });
const db_URI = process.env.MONGO_URI;
//var url = "mongodb://localhost:27017/EmployeeDB";
const url = db_URI;

var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
    // CSV file name
    const fileName = "employee.csv";
    var arrayToInsert = [];
    csvtojson().fromFile(fileName).then(source => {
        // Fetching the all data from each row
        for (var i = 0; i < source.length; i++) {
             var oneRow = {
                 firstName: source[i]["first_name"],
                 lastName: source[i]["last_name"],
                 department: source[i]["department"],
                 birthdate: source[i]["birthdate"],
                 costCenter: source[i]["costcenter"]
             };
             arrayToInsert.push(oneRow);
         }
         //inserting into the table “employees”
         var collectionName = 'employees';
         var collection = dbConn.collection(collectionName);
         collection.insertMany(arrayToInsert, (err, result) => {
             if (err) console.log(err);
             if(result){
                 console.log("Import CSV into database successfully.");
                 console.log("Closing DB connection. Bye!")
                 client.close();
             }
         });
    });
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});
