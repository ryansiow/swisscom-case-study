const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

//var url = "mongodb://localhost:27017/EmployeeDB";
const url = "mongodb+srv://rjsiow:Starwarsarc-170@clustertest.1vt7i.mongodb.net/EmployeeDB?retryWrites=true&w=majority"

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
         console.log(dbConn);
         var collection = dbConn.collection(collectionName);
         collection.insertMany(arrayToInsert, (err, result) => {
             if (err) console.log(err);
             if(result){
                 console.log("Import CSV into database successfully.");
             }
         });
    });
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});
