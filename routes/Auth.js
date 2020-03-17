const router = require('express').Router();

const User= require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { regtisterValidation,loginvalidator,editvalidation } = require('../validation');

router.post('/register', async (req,res) => {

    const {error} =  regtisterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const emailExits = await User.findOne({email: req.body.email});
    if(emailExits) return res.status('Email already exists !!');

    // Hash pass
    const salt = await  bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    console.log(hashPassword);
    const user = new User ({
        name : req.body.name,
        email: req.body.email,
        password: hashPassword
    });
     try {
           user.save();
         return res.send(user._id);

     }
     catch(err)
     {
            res.status(400).send(err);
     }
 });


 router.post('/login', async(req,res) => {
    console.log('loginnmnnnnnnnnnnnnnnnnnnn')
    const{error} = loginvalidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});

    if(!user){ 
    res.status(400).send('Invalid Email');
    }
    // const pas = bcrypt.(user.password);
    // console.log(pas);
    const validPass =await  bcrypt.compare(req.body.password,user.password);
 
    if(!validPass){ 
        return res.status(400).send('Invalid Password');
    }
    else{
        jwt.sign({user},process.env.TOKEN_SECRET,(err,token) => {
            res.json({
                token
            });
        });
       
    }

    // const token  = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    // console.log(token)
    // res.header('auth-token', token).send(token);

    
 });


    router.put('/edit/:userId',async (req,res) => {
        console.log('MMMMMMMMMMMMMMMMMMMMM');
        const {error} = editvalidation(req.body); 
        const _id = req.params.userId;
        console.log(_id);
        User.findById(_id)
        .then(user => {
            user.name = req.body.name,
            user.email = req.body.email,
            user.save()
                .then(user => {
                    res.send({message :  "Updated"})
                })
                .cathc(err => console.log(err))
        })
        .cathc(err => console.log(err));
       
   
    });

 module.exports = router;