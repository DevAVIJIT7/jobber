var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var companySchema = new Schema({
	name: {
		type: String,
		required: true
    },		
	acronym: {
		type: String,
		required: true
	}	
}, {
	timestamps: true
});

var Companies = mongoose.model('Company', companySchema);

module.exports = Companies;