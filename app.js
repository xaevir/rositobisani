/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , products = require('./routes/products')
  , categories = require('./routes/categories')
  , manuals = require('./routes/manuals')
  , uploadedFiles = require('./routes/uploadedFiles')
  , http = require('http')
  , path = require('path')
  , nodemailer = require("nodemailer")
  , smtpTransport = nodemailer.createTransport("SMTP", {host: "localhost"})
  , mongo = require('mongoskin')
  , RedisStore = require('connect-redis')(express)
  , bcrypt = require('bcrypt')

// setup Backbone models    
Backbone = require('backbone')
_ = require('underscore')
var Validation = require('./public/js/libs/backbone.validation.js')
_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
var NewUser = require('./public/js/models/newUser')


var app = express();

// all environments
//app.set('port', process.env.PORT || 8070);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: "batman", store: new RedisStore }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// all environments
app.configure(function(){
  app.set('title', 'My Application');
})

// development only
app.configure('development', function(){
  mediaBasePath = '/home/bobby/Dropbox/http/rositobisani/public/'
  uploadedFiles = uploadedFiles(app, mediaBasePath, __dirname + '/public/js/fileUpload')
  app.set('port', process.env.PORT || 8070);
  app.use(express.errorHandler());
  db = mongo.db("localhost/dev_rosito?auto_reconnect=true", {safe: true})
  app.locals({
    env: 'development',
  });
});

// production only
app.configure('production', function(){
  mediaBasePath = '/srv/http/rositobisani/public/'
  uploadedFiles = uploadedFiles(mediaBasePath)
  app.set('port', process.env.PORT || 8100);
  db = mongo.db("localhost/rosito?auto_reconnect=true", {safe: true})
  app.locals({
    env: 'production',
  });
});

// check session
function userData(session){
  var data = {user: {}}
  if (session.user) {
    data.user = {
      username: session.user.username, 
      _id:  session.user._id
    }
  }
  return data
}

// only allow if logged in
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// restrict to xhr
function xhrOnly(req, res, next) {
  if (!(req.xhr)) {
    res.render('layout', locals)
  } else {
    next()
  }
}


// redirect from www
app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    var new_url = 'http://' + req.headers.host.replace(/^www\./, '') + req.url
    res.redirect(301, new_url);
  }
  else next();
});

// set user and globals
app.get('/*', function(req, res, next) { 
  locals = {}
  locals.user = req.session.user ? JSON.stringify(req.session.user) : JSON.stringify({})
  if (app.settings.env == 'development') 
    locals.development = true 
  next()
})

app.get('/', function(req, res) {
  locals.title = ''
  if (req.xhr) {
    res.render('home', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('home_full', locals);
  }
});

app.get('/contact', function(req, res) {
  locals.title = 'Contact'
  if (req.xhr) {
    res.render('contact', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('contact_full', locals);
  }
});

app.get('/about', function(req, res) {
  locals.title = 'About Us'
  if (req.xhr) {
    res.render('about', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('about_full', locals);
  }
});

app.get('/home-espresso-machine', function(req, res) {
  locals.title = 'Best Home Espresso Machine'
  if (req.xhr) {
    res.render('landing/home-espresso-machine', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('landing/home-espresso-machine-full', locals);
  }
});

app.get('/privacy-policy', function(req, res) {
  locals.title = 'Privacy Policy'
  if (req.xhr) {
    res.render('privacyPolicy', locals, function(err, html){
      res.send({title: locals.title, body: html});
    });
  } else {
    res.render('privacyPolicy_full', locals);
  }
});


app.get('/user', function(req, res){
  res.send(req.session.user) 
})

function setUserSession(req, user){
  var userOmittedData = {
    _id: user._id,
    username: user.username,
    slug: user.slug,
    role: user.role
  }    
  req.session.user = userOmittedData
  return userOmittedData
}

app.post('/session', function(req, res) {

  function isEmailorUsername(){
    var key
    var spec = {}
    try {
      check(req.body.login).isEmail()
      key = 'email'
    } catch(e) {
      key = 'username'
    }
    spec[key] = req.body.login  
    return spec
  }

  var spec = isEmailorUsername(req.body.login)  

  db.collection('users').findOne(spec, function(err, user){
    if (!user)
      return res.send({success: false, message: 'user not found'});
    bcrypt.compare(req.body.password, user.password, function(err, match) {
      if (!match) 
        return res.send({success: false, message: 'user not found'});
      var userData = setUserSession(req, user)
      res.send(userData)
    })
  })
})

app.del('/user', function(req, res) {
  req.session.destroy(function(){
    res.send({success: true, 
              message: 'user logged out'
    })
  })
})



app.post('/user', function(req, res){ 
  var user = new NewUser(req.body)
  var errors = user.validate()
  if (errors) 
    res.send({success: false, errors: errors})
  else {
    user.setPassword(function(){
      db.collection('users').insert(user.toJSON(), function(err, result){
        var userData = setUserSession(req, result[0])
        res.send(userData);
      })
    })
  }
})

function isUniqueUsername(username, fn) {
  var username = username.toLowerCase()
  username = username.replace(/^@/, '')  //twitter @
  db.collection('users').findOne({username: username}, function(err, user){
    if (user)
      fn(false)
    else 
      fn(true)
  })
}
module.exports.isUniqueUsername = isUniqueUsername

app.get("/is-unique-username", function(req, res) {
  var username = req.query.username
  isUniqueUsername(username, function(isUnique){
    res.send(isUnique)
  })
})

app.get("/check-email", function(req, res){
  if (req.query.email == '')  return res.send(true)
  var email = req.query.email.toLowerCase()
  db.collection('users').findOne({email: email}, function(err, user){
    return user
      ? res.send(false)
      : res.send(true);
  })
})

app.post('/contact', function(req, res, next) {
  var html  = '<p>name: '+req.body.name+'</p>'
      html += '<p>email: '+req.body.email+'</p>'
      html += '<p>message: '+req.body.message+'</p>'
  email(
    {
      subject: 'Website Contact Page', 
      html: html 
    })
    res.send(req.body)
})

function email(opts) {
  if (app.settings.env === 'development')
    return console.log(opts.html)

  var message = {
      from: 'Website Contact Page <contact@rosito-bisani.com>',
      // Comma separated list of recipients
      to: 'gregl@rosito-bisani.com',
      bcc: 'bobby.chambers33@gmail.com'
  }
  message.subject = opts.subject
  message.html = opts.html

  smtpTransport.sendMail(message, function(error, response){
    if(error)
      console.log(error);
    else
      console.log("Email sent: " + response.message);
    smtpTransport.close(); // shut down the connection pool, no more messages
  })
}


app.get('/login', xhrOnly);
app.get('/signup', xhrOnly);


function addAppVar(req, res, next) {
  req.app = app; 
  next();
}

/* Manuals */
app.get('/manuals', xhrOnly, manuals.list);
app.get('/manuals/sorted', xhrOnly, manuals.sortedList);
app.get('/manuals/:id', xhrOnly, manuals.getOne);
app.get('/admin/manuals', restrict, xhrOnly);
app.get('/admin/manuals/:id/edit', restrict, xhrOnly);
app.get('/admin/manuals/category/:id', restrict, xhrOnly);
app.put('/manuals/:id', restrict, manuals.update);
app.post('/manuals/upload', restrict, manuals.upload);
app.del('/manuals/:id', restrict, manuals.remove)


/* Cats */
//app.get('/cats-test', addAppVar, cats.test);
app.get('/categories', xhrOnly, categories.list);
app.get('/categories/:id', xhrOnly, categories.getOne);
//app.post('/categories', restrict, cats.create);
//app.put('/categories/:slug', restrict, cats.update);
//app.get('/categories/:slug', xhrOnly, cats.listOne);


/* Products */
app.get('/products', xhrOnly, products.list);
app.post('/products', restrict, products.create);
app.put('/products/:slug', restrict, products.update);
//app.get('/products/Reale', xhrOnly, products.reale);
app.get('/products/:slug', xhrOnly, products.listOne);


/* Upload Files */
app.get('/uploadForm', addAppVar, uploadedFiles.uploadForm)
app.post('/upload/:product_id', restrict, uploadedFiles.create)
app.del('/files/:slug', restrict, uploadedFiles.remove)


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
