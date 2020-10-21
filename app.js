var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var standingsRouter = require('./routes/standings');
var usersRouter = require('./routes/users');
var myTeamsRouter = require("./routes/myTeams");
const uri = process.env.DB_URL;
const mongoose = require('mongoose');
const session = require('express-session');

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;

/*  Google AUTH  */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
const PASSPORT_SECRET = process.env.PASSPORT_SECRET;
const Driver = require('./models/drivers');
const Team = require("./models/teams");

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
   useNewUrlParser: true, 
   useUnifiedTopology: true 
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connect: ' + error)
   }
)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
   resave: false,
   saveUninitialized: true,
   secret: PASSPORT_SECRET 
 }));

 app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', standingsRouter);
app.get('/', function(req, res, next) {
  res.render('standings', { title: 'Express' });
});
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/myTeams');
  }
);

app.get('/error', (req, res) => res.send("error logging in"));

//app.use('/users', usersRouter);
// app.use("/myTeams", myTeamsRouter);

app.get('/admin/drivers', (req, res) => {
  res.render("admin/manageDrivers");
})

/* GET home page. */
app.get('/myTeams', async function(req, res, next) {
/*   Team.find({ email: userProfile.emails[0].value },(error, teamData) =>{
    if (error) {
      // Create the user in the database
      return next(error);
    } else {
      //console.log(teamData);
      Driver.find({}, {"_id": 0,"lastName": 1}, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.render('myTeams', { driversList : data, user: userProfile, teamData: teamData });
        }
      });
    }
  }); */
  let TeamData = await Team.find({ email: userProfile.emails[0].value },(error, teamData) =>{
      if (error) {
        return next(error);
      } else {
        return teamData;
      }
    });
  if (Object.keys(TeamData).length === 0) { 
    TeamData = [{ email: userProfile.emails[0].value, driver1: "", driver2: "", teamName: "" }, { email: userProfile.emails[0].value, driver1: "", driver2: "", teamName: "" }];
    // Team.insertMany(arr, function(error, docs) {});
  }
  let DriverData = await Driver.find({}, {"_id": 0,"lastName": 1}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        return data;
      }
    });
    // If successful run the DB query for that user team
    res.render('myTeams', { driversList : DriverData, user: userProfile, teamData: TeamData, showSuccess: 0 });
});

app.post('/myTeams', async function(req, res, next) {
  console.log(req.header.driversList);
  let TeamData = [{ email: userProfile.emails[0].value, driver1: req.body.team1Driver1, driver2: req.body.team1Driver2, teamName: "" }, { email: userProfile.emails[0].value, driver1: req.body.team2Driver1, driver2: req.body.team2Driver2, teamName: "" }];
  let DriverData = await Driver.find({}, {"_id": 0,"lastName": 1}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return data;
    }
  });
  res.render('myTeams', { driversList : DriverData, user: userProfile, teamData: TeamData, showSuccess: 1 });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_REDIRECT_URL
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 


module.exports = app;
