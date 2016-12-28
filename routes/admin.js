var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var passport = require('passport');

var connection = mysql.createConnection({
	user: 'root',
	password: 'n0wbon@!',
	database: 'yahanran'
});

function ensureAuthenticated (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect('/admin/index');
	}
};

router.get('/', function (req, res, next) {
	res.redirect('/admin/index');
});

router.get('/index', function (req, res, next) {
	res.render('./admin/index');	
});

router.post('/index', passport.authenticate('local-login', {
	successRedirect: '/admin/order/list',
	failureRedirect: '/admin/index',
	failureFlash: true
	}), function (req, res, next) {
		
});

router.get('/order/list', ensureAuthenticated, function (req, res) {
    connection.query('SELECT * FROM order_list ORDER BY id DESC', function (err, results) {
        res.render('./admin/order/list', {
            data: results
        });
    });
});

router.get('/order/insert', ensureAuthenticated, function (req, res, next) {
	var now = new Date();

	res.render('./admin/order/insert', {
		time: now.toLocaleString()
	});
});

router.post('/order/insert', ensureAuthenticated, function (req, res, next) {
	var date = new Date(req.body.date);
	var inputData = {
        date: date,
        name: req.body.name,
        phone: req.body.phone,
        regular: req.body.regular,
        day: req.body.day,
        eggNum: req.body.eggNum,
        eggSet: req.body.eggSet,
        price: 0,
        place: req.body.place,
        deposit: req.body.deposit,
        deliver: 'X'
	};
	inputData.price = 500 * inputData.eggNum * inputData.eggSet;
	
	if (req.body.deliver == 'N') {
		if (req.body.regular == 'Y')
			inputData.deliver = '0';
		else
			inputData.deliver = 'N';
	}
	else {
		inputData.deliver = 'Y';	
	}

    connection.query('INSERT INTO order_list SET ?', inputData, function (err, results) {
        if (err)
            console.log('Error');
        else
            res.redirect('/admin/order/list');
    });

});

router.get('/order/edit/:id', ensureAuthenticated, function (req, res, next) {
	connection.query('SELECT * FROM order_list WHERE id = ?', [
		req.params.id
	], function (err, results) {
		if (err) {
			console.log('ERROR');
		}
		else {
			res.render('./admin/order/edit', {
				data: results[0]
			});
		}
	});
});

router.post('/order/edit/:id', ensureAuthenticated, function (req, res, next) {
    var date = new Date(req.body.date);
	var inputData = {
        date: date,
        name: req.body.name,
        phone: req.body.phone,
        regular: req.body.regular,
        day: req.body.day,
        eggNum: req.body.eggNum,
        eggSet: req.body.eggSet,
        price: 0,
        place: req.body.place,
        deposit: req.body.deposit,
        deliver: req.body.deliver
	};
    inputData.price = 500 * inputData.eggNum * inputData.eggSet;

    connection.query('UPDATE order_list SET ? WHERE ?', [ inputData, { id: req.params.id }	
	], function() {
		res.redirect('/admin/order/list');
	});
});

router.post('/order/delete/:id', ensureAuthenticated, function (req, res, next) {
	connection.query('DELETE FROM order_list WHERE id = ?', [ req.params.id
	], function() {
		res.redirect('/admin/order/list');
	});
});

router.get('/order/deposit_update/:id', ensureAuthenticated, function (req, res, next) {
	connection.query('SELECT deposit FROM order_list WHERE id = ?', [ req.params.id
	], function (err, results) {
		if (results[0].deposit == 'Y') {
			connection.query('UPDATE order_list SET deposit = ? WHERE id = ?', [ 'N', req.params.id
			], function () {
		    	res.redirect('/admin/order/list');
			});
		}
		else {
			connection.query('UPDATE order_list SET deposit = ? WHERE id = ?', [ 'Y', req.params.id
			], function () {
				res.redirect('/admin/order/list');
			});
		}
	});
});

router.get('/order/deliver_update/:id', ensureAuthenticated, function (req, res, next) {
    connection.query('SELECT regular, deliver FROM order_list WHERE id = ?', [ req.params.id
    ], function (err, results) {
        if (results[0].deliver == 'N') {
            connection.query('UPDATE order_list SET deliver = ? WHERE id = ?', [ 'Y', req.params.id
            ], function () {
                res.redirect('/admin/order/list');
            });
        }
        else if (results[0].deliver == '0') {
            connection.query('UPDATE order_list SET deliver = ? WHERE id = ?', [ '1', req.params.id
            ], function () {
                res.redirect('/admin/order/list');
            });
		}
		else if (results[0].deliver == '1') {
			connection.query('UPDATE order_list SET deliver = ? WHERE id = ?', [ '2', req.params.id
			], function () {
				res.redirect('/admin/order/list');
        	});
		}
		else if (results[0].deliver == '2') {
            connection.query('UPDATE order_list SET deliver = ? WHERE id = ?', [ 'Y', req.params.id
            ], function () {
                res.redirect('/admin/order/list');
			});
		}
		else {
			if (results[0].regular == 'Y') {
	        	connection.query('UPDATE order_list SET deliver = ? WHERE id = ?', [ '0', req.params.id
   	        	], function () {
   	            	res.redirect('/admin/order/list');
   	         	});
			}
			else {
				connection.query('UPDATE order_list SET deliver = ? WHERE id = ?', [ 'N', req.params.id
            	], function () {
                res.redirect('/admin/order/list');
				});
			}
		}
    });
});


module.exports = router;
