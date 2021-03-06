# Swisscom Case Study
You work for an IT department of a small company. Your HR department asked you to create a workflow that automatically creates Virtual Machines for employees based on a .csv list.
The HR department will deliver you an updated list periodically via E-Mail. The list only contains current employees – if an employee left the company, he/she won’t be listed in the list and his/her VM shall be deprovisioned. Unfortunately, that’s the best your HR department can do at this point.


### Commands
Data is populated from CSV file to MongoDB. To populate DB:
- `cd db_populate`
- `npm install`
- `node index.js`

### Start backend and frontend
The backend (NodeJS) and frontend (React) are dockerized. Backend is accessible at localhost:5000, and frontend at localhost:3001. You can launch with:
- `docker-compose build`
- `docker-compose up -d`<br />

To check if services are running, you can just do:
- `docker container ls`


If you want to use a local MongoDB instance, you'll have to uncomment db service in docker-compose file, and create an .env file with these parameters:
```
MONGO_USERNAME=
MONGO_PASSWORD=
MONGO_PORT=
MONGO_DB=
MONGO_HOSTNAME=
```

### Swagger
Incidentally, you can view API documentation on a Swagger interface at localhost:5000/api-docs/.

### Priority check
- [x] Organize a Git Repository, set it to public, and send us the link before you start working on the assessment.
- [x] Backend: Setup of a simple backend application (can return a static list initially)
- [ ] Create a workflow in vRO with the basic structure of the work it needs to do
- [x] Host your backend somewhere and retrieve the list of employees from vRO via http
- [ ] “Deploy” VMs based on the retrieved list in your workflow
- [x] Create an employee collection in the database
- [x] Containerize your backend application
- [x] Create script to load CSV into the database
- [x] Containerize the database
- [x] Create a proper deployment for your whole backend app (k8s or docker-compose)
- [x] Implement filter parameters on the query API
- [x] Write down a specification on how to use the API (target solution)
- [ ] Implement that the URL and credentials are stored as configuration elements in vRO
- [ ] Parameterize vRO workflow to query only specific departments from backend
- [x] Implement basic authentication on backend
