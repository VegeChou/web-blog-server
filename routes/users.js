var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var check = require('../modules/check-login.js');


/* GET users listing. */

router.post('/signin', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	authenticate(email, password, function(error, uid) {
		var response = {};
		if (error) {
			response.error = error;
			res.status(401).send(response);
		} else {
			req.session.uid = uid;
			response.access_token = req.sessionID;
			res.send(response);
		}
	});
});

router.get('/info', requireAuthentication, function(req, res, next) {
	getUserInfo(req.uid, function(error, user) {
		var response = {};
		if (error) {
			response.error = error;
			res.send(response);
		} else {
			console.log(user);
			res.send(user);
		}
	});
});

function authenticate(email, password, fn) {
	if (email == null) {
		return fn('email is null');
	}
	if (password == null) {
		return fn('password is null');
	}
	Db_users.findOne({
		email: email
	}, function(err, result) {
		if (err != null) {
			return fn('cannot find user:' + err);
		} else if (result == null) {
			return fn('email is not exist');
		} else if (password != result.password) {
			return fn('passowrd is error');
		} else {
			return fn(null, result.id);
		};
	});
}

function getUserInfo(uid, fn) {
	if (uid == null) {
		return fn('uid is null');
	}
	Db_users.findOne({
		uid: uid
	}, function(err, result) {
		if (err != null) {
			return fn('cannot find user:' + err);
		} else if (result == null) {
			return fn('user is not exist');
		} else {
			return fn(null, result);
		};
	});
}

function requireAuthentication(req, res, next) {
	var response = {};
	var sessionID = req.get('X-Session-ID');

	req.sessionStore.get(sessionID,function(error,result){
		if (result == null) {
			response.error = 'not login';
			res.status(403).send(response);
		} else {
			req.uid = result.uid;
			next();
		}
	});
}

module.exports = router;