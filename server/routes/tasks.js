var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Tasks = require('../models/task');

var taskRouter = express.Router();
taskRouter.use(bodyParser.json());

taskRouter.route('/')
.get(function (req, res, next) {
	Tasks.find({}, function (err, task) {
		if (err) throw err;
		res.json(task);
	});
})

.post(function (req, res, next) {
	Tasks.create(req.body, function (err, task) {
		if (err) throw err;
		var id = task._id;

		res.writeHead(200, {
			'Content-Type': 'text/plain' 
		});

		res.end('Added the task with id: '+ id);
	});
})

.delete(function (req, res, next) {
	Tasks.remove({}, function (err, response) {
		if (err) throw err;
		res.json(response);
	})
});

taskRouter.route('/:taskId')
.get(function (req, res, next) {
	Tasks.findById(req.params.taskId, function (err, task) {
		if (err) throw err;
		res.json(task);
	});
})

.put(function (req, res, next) {
	Tasks.findByIdAndUpdate(req.params.taskId, {
		$set: req.body
	}, {
		new: true
	}, function (err, task) {
		if (err) throw err;
		res.json(task);
	});
})

.delete(function (req, res, next) {
	Tasks.findByIdAndRemove(req.params.taskId, function (err, response) {
		if (err) throw err;
		res.json(response);
	})
});

module.exports = taskRouter;
