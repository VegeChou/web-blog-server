module.exports = function(req, res, next) {
	var response = {};
	console.log("all api check login");

	var sessionID = req.get('X-Session-ID');

	var result = req.sessionStore.get(sessionID);
	console.log(result);

	client.get("sess:" + sessionID, function(err, reply) {
		if (reply == null) {
			response.error = 'not login';
			res.status(403).send(response);
		} else {
			next();
		}
	});
}