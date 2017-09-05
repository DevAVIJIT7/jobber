var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Companies = require('../models/company');

var companyRouter = express.Router();
companyRouter.use(bodyParser.json());

companyRouter.route('/')
.get(function (req, res, next) {
	Companies.find({}, function (err, company) {
		if (err) throw err;
		res.json(company);
	});
})

.post(function (req, res, next) {
	Companies.create(req.body, function (err, company) {
		if (err) throw err;
		var id = company._id;

		res.status(201).json({
			message: 'Company added Successfuly',
			data: {id: id}
		});
	});
});

module.exports = companyRouter;
