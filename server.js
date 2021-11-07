// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date_string?", function (req, res) {
  var date_string = req.params.date_string;

  // if no date_string is provided, return today's date
  if (date_string == null) {
    date = new Date();
  }
  else if(date_string.match(/^\d+$/)) {
    // if date_string is a number, assume it's a unix timestamp
    date = new Date(parseInt(date_string));
  }
  else{
    date = new Date(date_string);
  }
  // checking if date is valid
  if(date.toUTCString() == "Invalid Date") {
    res.json({error: "Invalid Date"});
  }
  else{
  res.json({unix: date.getTime(), utc: date.toUTCString()});
  }

});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
