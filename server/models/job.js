var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var jobSchema = new Schema({
	job_key: String,
	status: Number,
	customer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},		
	proposed_start_at: Number,	
	proposed_end_at: Number,
	actual_start_at: Number,	
	actual_end_at: Number,
	start_location: String,
	end_location: String,
	start_location_latitude: Number,
	start_location_longitude: Number,
	end_location_latitude: Number,
	end_location_longitude: Number,
	creator_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company'
	},
}, {
	timestamps: true
});

var Jobs = mongoose.model('Job', jobSchema);

module.exports = Jobs;