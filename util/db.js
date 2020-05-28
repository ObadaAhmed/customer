const mongoose = require('mongoose');

// here we connect to mongodb nosql database
mongoose.connect('mongodb://localhost:27017/customerDB' , {useNewUrlParser : true , useUnifiedTopology : true})
    .then(()=> {
        console.log(`connected to customer db`);
    }).catch(err=>{
        console.log(`error in connecting to mongodb ${err}`);
});
