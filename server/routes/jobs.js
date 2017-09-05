var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Jobs = require('../models/job');

var jobRouter = express.Router();
jobRouter.use(bodyParser.json());

jobRouter.route('/')
.get(function (req, res, next) {
	Jobs.find({}, function (err, job) {
		if (err) throw err;
		res.json(job);
	});
})

.post(function (req, res, next) {
	Jobs.create(req.body, function (err, job) {
		if (err) throw err;
		var id = job._id;

		res.writeHead(200, {
			'Content-Type': 'text/plain' 
		});

		res.end('Added the job with id: '+ id);
	});
})

.delete(function (req, res, next) {
	Jobs.remove({}, function (err, response) {
		if (err) throw err;
		res.json(response);
	})
});

jobRouter.route('/:jobId')
.get(function (req, res, next) {
	Jobs.findById(req.params.jobId, function (err, job) {
		if (err) throw err;
		res.json(job);
	});
})

.put(function (req, res, next) {
	Jobs.findByIdAndUpdate(req.params.jobId, {
		$set: req.body
	}, {
		new: true
	}, function (err, job) {
		if (err) throw err;
		res.json(job);
	});
})

.delete(function (req, res, next) {
	Jobs.findByIdAndRemove(req.params.jobId, function (err, response) {
		if (err) throw err;
		res.json(response);
	})
});

module.exports = jobRouter;
