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

// Connecting with mongo db
var TeamData, DriverData, EngineData, ChassiData;
const Driver = require('./models/drivers');
const Team = require("./models/teams");
const Engine = require("./models/engines");
const Chassi = require("./models/chassis");
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
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

/* GET home page. */
app.get('/myTeams', async function(req, res, next) {
  try {
    TeamData = await Team.findOne({ email: userProfile.emails[0].value },(error, data) =>{
        if (error) {
          return error;
        } else {
          return data;
        }
    });
    
    if (!TeamData) {
      TeamData = new Team({ email: userProfile.emails[0].value });
    }
    
    DriverData = await Driver.find({}, (error, data) => {
        if (error) {
          return next(error);
        } else {
          return data;
        }
    });

    EngineData = await Engine.find({}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        return data;
      }
    });

    ChassiData = await Chassi.find({}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        return data;
      }
    });

    res.render('myTeams', { driversList: DriverData, user: userProfile, teamData: TeamData, showSuccess: 0, enginesList: EngineData, chassisList: ChassiData });
  } catch (error) {
    next(error);
  }
});

app.post('/myTeams', async function(req, res, next) {

  let saveTeam = new Team(TeamData);
  saveTeam.teamOwner = req.body.teamOwner;
  saveTeam.team1Name = req.body.team1Name;
  saveTeam.team1Driver1 = req.body.hiddenTeam1Driver1;
  saveTeam.team1Driver2 = req.body.hiddenTeam1Driver2;
  saveTeam.team1Engine = req.body.hiddenTeam1Engine;
  saveTeam.team1Chassi = req.body.hiddenTeam1Chassi;
  saveTeam.team2Name = req.body.team2Name;
  saveTeam.team2Driver1 = req.body.hiddenTeam2Driver1;
  saveTeam.team2Driver2 = req.body.hiddenTeam2Driver2;
  saveTeam.team2Engine = req.body.hiddenTeam2Engine;
  saveTeam.team2Chassi = req.body.hiddenTeam2Chassi;
  await saveTeam.save();
  res.render('myTeams', { driversList: DriverData, user: userProfile, teamData: saveTeam, showSuccess: 1, enginesList: EngineData, chassisList: ChassiData });
});

app.get('/admin/drivers', async function(req, res) {
  
  if (!DriverData){
    DriverData = await Driver.find({}, (error, data) => {
      if (error) {
        return next(error);
      } else {
        return data;
      }
    });
  }
  res.render('admin/manageDrivers', { driversList: DriverData });
});

app.post('/admin/drivers', async function(req, res, next) {
  let saveDrivers = new Driver(DriverData);
  saveDrivers.value = req.body.

  DriverData = await Driver.find({}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return data;
    }
  });
  res.render('admin/manageDrivers', { driversList: DriverData });
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
