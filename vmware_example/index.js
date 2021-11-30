const axios = require('axios').default;
const {Base64} = require('js-base64');

const tok = 'admin:password';
const hash = Base64.encode(tok);
const basicAuth = 'Basic ' + hash;

axios
    .get('http://localhost:5000/record/', { headers: { 'Authorization': basicAuth }})
    .then((response) => {
      //console.log(response.headers['Authorization']);
      var array = response.data.filter(function(x) {
        return (x["department"] == 'HR' || x["department"] == 'IT');
      })
      array.forEach((item, i) => {
        console.log("VM created for " + item.firstName + " " + item.lastName);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
