var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	username: String,
	password: {
		type: String,
		required: true
    },		
	email: {
		type: String,
		required: true,
        unique: true
	},	
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	user_type: String,
	company_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company'
	}
}, {
	timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;