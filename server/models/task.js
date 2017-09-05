var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var taskSchema = new Schema({
	address: String,
	status: Number,
	latitude: Number,
	longitude: Number,
	sequence: Number,
	job_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Job'
	},		
	proposed_start_at: Number,	
	proposed_end_at: Number,
	actual_start_at: Number,	
	actual_end_at: Number,
	comment: String,
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company'
	},
}, {
	timestamps: true
});

var Tasks = mongoose.model('Task', taskSchema);

module.exports = Tasks;