var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var moment = require('moment');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.redirect('./yahanran/index');
});

router.get('/index', function (req, res, next) {
	res.render('./yahanran/index');
});

router.get('/about', function (req, res, next) {
	res.render('./yahanran/about');
});

router.get('/order', function (req, res, next) {
	res.redirect('./about');
});

router.get('/contact', function (req, res, next) {
	res.render('./yahanran/contact');
});

router.post('/order', function (req, res, next) {
	var now = new Date();

	var connection = mysql.createConnection({
		user: 'root',
		password: 'daneul94',
		database: 'yahanran'
	});

	var inputData = {
		date: moment(now).format('YYYY-MM-DD HH:mm:ss'),
		name: req.body.name,
		phone: req.body.tel,
		regular: req.body.orderkind,
		eggSet: 0,
		price: 0,
		deposit: 'N',
		deliver: 'E'

	};

	if (req.body.orderkind == 'regular') {
       	inputData.regular = 'Y';
   	}
    else if (req.body.orderkind == 'singular') {
        inputData.regular = 'N'
    }
    else {
		console.log('[ERR] inputData.regular is wrong value');
		res.redirect('/yahanran/about');
    }

	if (req.body.eggnumber == 6) {
		inputData.eggSet = 1;
		inputData.price = 3000;
	}
	else if (req.body.eggnumber == 12) {
		inputData.eggSet = 2;
		inputData.price = 6000;
	}
	else if (req.body.eggnumber == 18) {
		inputData.eggSet = 3;
		inputData.price = 9000;
	}
	else if (req.body.eggnumber == 24) {
		inputData.eggSet = 4;
		inputData.price = 12000;
	}
	else {
        console.log('[ERR] inputData.eggNum and inputData.eggSet is wrong value');
        res.redirect('/yahanran/about');
	}

	if (inputData.regular == 'Y') {
		inputData.deliver = '0'
	}
	else if (inputData.regular == 'N') {
		inputData.deliver = 'N'
	}
	else {
        console.log('[ERR] inputData.regular is wrong value');
        res.redirect('/yahanran/about');
	}

	console.log(inputData);

	connection.query('INSERT INTO order_list SET ?', inputData, function (err) {
		if (err) {
			console.log('[ERR] User order does not save at the database');
			res.send('<script type="text/javascript">alert("DB에 저장하는 과정에서 오류가 발생하였습니다.")</script>');
		}
		else {
			res.render('yahanran/order', {
				eggSet: inputData.eggSet,
				price: inputData.price
			});
		}
	});
});


module.exports = router;
