# swisscom-case-study
This is the API. It can accept GET, POST, PUT and DEL requests.

### GET
You can get all records like so:
- `curl -u admin:password http://localhost:5000/records`

Get a single record by id:
- `curl -u admin:password http://localhost:5000/record/:id`

Get a single record by firstName:
- `curl -u admin:password http://localhost:5000/record/:firstName`

Get a single record by lastName:
- `curl -u admin:password http://localhost:5000/record/:lastName`

Get a single record by department:
- `curl -u admin:password http://localhost:5000/record/:department`

Get a single record by birthdate:
- `curl -u admin:password http://localhost:5000/record/:birthdate`

Get all records by department:
- `curl -u admin:password http://localhost:5000/record/:department`

Get a record by costcenter:
- `curl -u admin:password http://localhost:5000/record/:costcenter`

### POST
Create a new record:
- ```curl -u admin:password -d '{"firstName":"Ryan","lastName":"Siow","department":"IT","birthdate":"17.10.1992","costCenter":"11111"}' -H "Content-Type: application/json" -X POST http://localhost:5000/record/add```

Update a record by id:
- ```curl -u admin:password -d '{"firstName":"Ryan","lastName":"Siow","department":"IT","birthdate":"17.10.1992","costCenter":"11111"}' -H "Content-Type: application/json" -X POST http://localhost:5000/update/:id```

### DELETE
Delete a record by id:
- ```curl -u admin:password DELETE http://localhost:5000/:id```
