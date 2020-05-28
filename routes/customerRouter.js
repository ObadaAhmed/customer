const express  = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Config = require('../util/Config');

// first get all customers
router.get('/' ,async (req,res)=> {
   try {
       const customers = await Customer.find({});
       res.send(customers);
   }catch (e) {
       res.send(e);
   }
});

// get a single customer 

router.get('/:id' , async (req,res,next)=> {

    try{

        const customer = await Customer.findById({_id : req.params.id});
        res.send(customer);

    }catch (e){
        res.send(new errors.ResourceNotFoundError(`there is no customer with id ${req.params.id}`));
    }


});


// post a customer

router.post('/', async (req,res , next)=>{
   let {name , email , balance} = req.body;

   if (!req.is('application/json')) {
     res.send(
      new errors.InvalidContentError("Expects 'application/json'")
    );
  }

    try {
        const newCustomer = new Customer({
            name,
            email,
            balance
        });

        const customer = await newCustomer.save();
        res.send(201);

    } catch (e) { 
         res.send(new errors.InternalError(e));
    }

});

// here we update a customer 

router.put('/:id' , async (req,res,next)=> {
    
   if (!req.is('application/json')) {
    res.send(
     new errors.InvalidContentError("Expects 'application/json'")
   );
 }


    try{

        const updatedCustomer = await Customer.findOneAndUpdate({_id : req.params.id} , req.body);
        res.send(200);
      
    }catch(e){
        res.send(new errors.ResourceNotFoundError(`customer with id ${req.params.id} not found`));
    }


});

// finally here we delete a customer 

router.delete('/:id' , async (req,res,next)=>  {

        if (!req.is('application/json')) {
                res.send(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try{

            const deletedCustomer = await Customer.findOneAndRemove({_id : req.params.id});
            res.send(204);

        }catch(e){
            res.send(new errors.ResourceNotFoundError(`customer with id ${req.params.id} not found`))
        }
})



module.exports = router;
