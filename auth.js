const bcrypt = require('bcryptjs');
const User = require('./models/users');



exports.authenticate = async (email , password)=> {

    return new Promise( async(resolve, reject)=> {


        try {

              // get the user by email 

        const user = await  User.findOne({email});

        bcrypt.compare(password , user.password , (err , isMatch)=> {
            if (err) {
                throw err
            }

            if (! isMatch) {
                reject(`password didn't match`)
            }

            resolve(user);
        });

            
        } catch (error) {
                reject(`Email ${email} is not registerd`);
        }
      
    });
}