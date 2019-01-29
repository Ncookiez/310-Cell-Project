var express = require('express');
var router = express.Router();

// Home Page:
router.get('/', function(req, res, next) {
  res.render('index');
});

// 20 Questions:
router.get('/20-questions', function(req, res, next) {
  res.render('20questions');
});

// Hangman:
router.get('/hangman', function(req, res, next) {
  res.render('hangman');
});

module.exports = router;