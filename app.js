
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
  var locals = {title: 'Homepage'}
  if (req.xhr) {
    res.render('home', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('home_full', locals);
  }
});

app.get(/^\/v-./, function(req, res) {
  var locals = {title: 'Home'}
  if (req.xhr) {
    res.render('home', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('home_full', locals);
  }
});



app.get('/icons', function(req, res) {
  var locals = {title: 'Icons'}
  if (req.xhr) {
    res.render('icons', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('icons_full', locals);
  }
});

app.get('/new', function(req, res) {
  var locals = {title: 'New'}
  if (req.xhr) {
    res.render('new', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('new_full', locals);
  }
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
