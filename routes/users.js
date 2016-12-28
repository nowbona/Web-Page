var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var moment = require('moment');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.redirect('/index');
});

router.get('/index', function (req, res, next) {
	res.render('index');
});

router.get('/about', function (req, res, next) {
	res.render('about');
});

router.get('/order', function (req, res, next) {
	res.redirect('/yahanran/about');
});

router.get('/contact', function (req, res, next) {
	res.render('contact');
});

router.get('/login2', function (req, res, next) {
	res.render('login2');
});

router.get('/join', function (req, res, next) {
	res.render('join');
});

router.get('/findpassword', function (req, res, next) {
	res.render('findpassword');
});

router.post('/order', function (req, res, next) {
	var now = new Date();

	var connection = mysql.createConnection({
		user: 'root',
		password: 'n0wbon@!',
		database: 'yahanran'
	});

	var inputData = {
		date: moment(now).format('YYYY-MM-DD HH:mm:ss'),
		name: req.body.name,
		phone: req.body.tel,
		regular: req.body.orderkind,
		day: req.body.day,
		eggNum: 0,
		eggSet: 0,
		price: 0,
		place: req.body.place,
		deposit: 'N',
		deliver:'E'
	};

	if (req.body.orderkind == 3) {
       	inputData.regular = 'Y';
   	}
    else if (req.body.orderkind == 1) {
        inputData.regular = 'N'
    }
    else {

    }

	if (req.body.eggnumber == 10) {
		inputData.eggNum = 10;
		inputData.eggSet = 1;
		inputData.price = 5000;
	}
	else if (req.body.eggnumber == 20) {
		inputData.eggNum = 10;
		inputData.eggSet = 2;
		inputData.price = 10000;
	}
	else if (req.body.eggnumber == 6) {
		inputData.eggNum = 6;
		inputData.eggSet = 1;
		inputData.price = 3000;
	}
	else if (req.body.eggnumber == 12) {
		inputData.eggNum = 6;
		inputData.eggSet = 2;
		inputData.price = 6000;
	}
	else {

	}

	if (inputData.regular == 'Y') {
		inputData.day = 'MON';
	}
	else {

	}

	inputData.price = inputData.price * req.body.orderkind;

	if (inputData.regular == 'Y') {
		inputData.deliver = '0'
	}
	else if (inputData.regular == 'N') {
		inputData.deliver = 'N'
	}
	else {

	}

	connection.query('INSERT INTO order_list SET ?', inputData, function (err) {
		if (err) {
			console.log('ERR');
		}
		else {
			var deliveryDay;
			if (inputData.day == 'MON') {
				deliveryDay = '월';
			}
			else if (inputData.day == 'THU') {
				deliveryDay = '목';
			}
			else {

			}

			var deliveryPlace;
			if (inputData.place == 'DORM') {
				deliveryPlace = '기숙사 택배실';
			}
			else if (inputData.place == 'EB2') {
				deliveryPlace = '제2공학관 엘리베이터 앞으';
			}
			else {

			}

			res.render('order', {
				price: inputData.price,
				day: deliveryDay,
				place: deliveryPlace
			});
		}
	});
});


module.exports = router;
