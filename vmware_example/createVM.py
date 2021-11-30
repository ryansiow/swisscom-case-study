import requests

url = 'http://localhost:5000/record/'
username = "admin"
password = "password"
response = requests.get(url, auth=(username, password))
print("Status code: ")
print(response.status_code)
# print(response.json())

lst = [x for x in response.json() if (x['department'] == 'HR' or x['department'] == 'IT')]

for employee in lst:
    print("VM created for " + employee['firstName'] + " " + employee['lastName'])
    print("VM name: " + employee['department'] + "-" + employee['firstName'] + "-" + employee['lastName'])
