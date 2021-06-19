var express = require('express');

var app = express();

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// tell express we wanna use ejs as our view engine
app.set('view engine', 'ejs');

// whenever the url match assets, it will get matched to the assets directory,
// and be able to serve the static files inside the directory
app.use('/assets', express.static('assets'));

// express listenes for a get request in '/'
app.get('/', function(req, res) {
  res.render('index');
})
app.get('/contact', function(req, res) {
  // send a html file
  res.render('contact', {qs: req.query})
})

// when we hit the submit button to launch a post request this get called
// then the data sent by the form will be parsed by urlencodedParser
// then we can access the data via the req object by using req.body
app.post('/contact', urlencodedParser, function(req, res) {
  res.render('contact-success', {data: req.body})
})

app.get('/profile/:name', function(req, res) {
  var data = {age: 29, job: 'ninja', hobbies: ['football', 'dancing', 'sleeping', 'bullshitting']};
  // render ./views/profile.ejs view with data passed
  res.render('profile', {person: req.params.name, data: data});
})


app.listen(5000);
