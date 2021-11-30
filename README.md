# Swisscom Case Study
You work for an IT department of a small company. Your HR department asked you to create a workflow that automatically creates Virtual Machines for employees based on a .csv list.
The HR department will deliver you an updated list periodically via E-Mail. The list only contains current employees – if an employee left the company, he/she won’t be listed in the list and his/her VM shall be deprovisioned. Unfortunately, that’s the best your HR department can do at this point.


### Commands
Data is populated from CSV file to MongoDB. To populate DB:
- `cd db_populate`
- `npm install`
- `node index.js`

### Start backend and frontend
The backend (NodeJS) and frondend (React) are dockerized. Backend is accessible at localhost:5000, and frontend at localhost:3001. You can launch with:
- `docker-compose build`
- `docker-compose up -d`<br />

To check if services are running, you can just do:
- `docker container ls` 
