var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  skills = ['JavaScript', 'Ruby', 'Rails', 'Python', 'HTML/CSS', 'php', 'Java', 'Django']

  res.render('index', skills);
});

router.get('/results', function(req, res) {

  var Twit = require('twit')
  T = new Twit({
    consumer_key:         'h9PJf2OIsSmxvAZSwBozJXkqE'
      , consumer_secret:      'jMB0yFPXa0ezBF0d2AUEQHyjisgTYI5Agdt3mEy1y8oE0GLjxn'
      , access_token:         '37986434-BqWyvq8JLWFbJ1yIgk9SBdSp6IxHUEixfpu4WpkEC'
      , access_token_secret:  'DSHutc2ljMBPBVdWVP5O3JmgsLKbdget0vGBnqORjB509'
  })

  console.log(req.query['data']);

  var twitterQuery = req.query['data'] + ' -RT since:2015-01-01';
  console.log(twitterQuery);

  T.get('search/tweets', { q: twitterQuery, count: 18 }, function(err, data, response) {
    //respond with json
    console.log(data["statuses"]);
    res.json(data["statuses"]);
    });

});

module.exports = router;
