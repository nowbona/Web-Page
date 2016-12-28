var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.redirect('/yahanran');
});

router.get('/login', function (req, res, next) {
	res.render('login');
});

router.get('/join', function (req, res, next) {
	res.render('join');
});
router.get('/agreement', function (req, res, next) {
	res.render('agreement');
});
router.get('/myinfor', function (req, res, next) {
	res.render('myinfor');
});
router.get('/myorder', function (req, res, next) {
	res.render('myorder');
});
router.get('/findpassword', function (req, res, next) {
	res.render('findpassword');
});

module.exports = router;
