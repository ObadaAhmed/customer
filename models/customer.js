const mongoose  = require('mongoose');
const schema = mongoose.Schema;

const customerSchmea = new schema({
   name  : {
       type : String ,
       required : true,
       trim : true
   },
    email  : {
        type : String ,
        required : true,
        trim : true
    },
    balance : {
       type : Number,
        default : 0
    }

});

const Customer = mongoose.model('customer' , customerSchmea);

module.exports = Customer;
