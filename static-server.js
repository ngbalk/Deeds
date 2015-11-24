var express = require('express');
var app = express();
var bodyParser=require("body-parser");
var fs = require('fs');
app.use(bodyParser.json());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
   if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  } else {
    return next();
  }
});


app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});





app.post('/post', function(request, response){
  console.log(request.body);
  fs.writeFile("components.json", JSON.stringify(request.body,null,2), function(err) {
    if(err) {
        return console.log(err);
    }
  }); 
  response.end("yes");
});

app.listen(3001);
console.log('Listening on port 3001...');