const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usersSchema = new schema({
    email : {
        type :String ,
        required :true,
        trim : true
    },

    password : {
        type : String,
        required : true
    }
});

const User = mongoose.model('user' , usersSchema);

module.exports = User;