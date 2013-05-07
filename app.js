
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , nodemailer = require("nodemailer")
  , smtpTransport = nodemailer.createTransport("SMTP", {host: "localhost"})

var app = express();

// all environments
app.set('port', process.env.PORT || 8070);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// all environments
app.configure(function(){
  app.set('title', 'My Application');
})

// development only
app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals({
    env: 'development',
  });
});

// production only
app.configure('production', function(){
  app.locals({
    env: 'production',
  });
});

// redirect from www
app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\./, '') + req.url
    res.redirect(301, new_url);
  }
  else next();
});

// force xhr
//app.get('/*', function(req, res, next) { 
  //if ((/\.(gif|jpg|png|css|js|html)$/i).test(req.url)) 
    //next()
  //if (req.xhr) {
    //res.render('layout', {})
//})


app.get('/', function(req, res) {
  var locals = {title: 'Rosito Bisani'}
  if (req.xhr) {
    res.render('home', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('home_full', locals);
  }
});

app.get('/red-icons-on-black', function(req, res) {
  var locals = {title: 'Rosito Bisani'}
  res.render('red-icons-on-black', locals);
});

app.get('/red-icon-bar', function(req, res) {
  var locals = {title: 'Rosito Bisani'}
  res.render('red-icon-bar', locals);
});

app.get('/icons-in-navbar', function(req, res) {
  var locals = {title: 'Rosito Bisani'}
  res.render('icons-in-navbar', locals);
});



app.get('/silver-bar', function(req, res) {
  var locals = {title: 'Rosito Bisani'}
  res.render('silver-bar', locals);
});




app.get('/icons-left', function(req, res) {
  var locals = {title: 'Home'}
  if (req.xhr) {
    res.render('icons-left', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('icons-left_full', locals);
  }
});

app.get('/machines', function(req, res) {
  var locals = {title: 'Home'}
  if (req.xhr) {
    res.render('machines', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('machines_full', locals);
  }
});




/*app.get('/icons', function(req, res) {
  var locals = {title: 'Icons'}
  if (req.xhr) {
    res.render('icons', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('icons_full', locals);
  }
});
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
