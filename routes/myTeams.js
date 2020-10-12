var express = require('express');
var router = express.Router();
// Employee model
const Driver = require('../models/drivers');

/* GET home page. */
router.get('/', function(req, res, next) {
  Driver.find({}, {"_id": 0,"lastName": 1}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      //console.log(data);
      //res.json(data);
      res.render('myTeams', { driversList : data });
    }
  })
});

module.exports = router;
