const jwt = require('jsonwebtoken');
module.exports = function(req,res,next)
{
    // const token = req.headers('auth-token');
    // if(!token) return res.send('Access Denied');
    // try {
    //     const verified = jwt.verify(token,process.env.TOKEN_SECRET);
    //     req.user = verified;
    //     next();
    // } catch(err)
    // {
    //     res.status(400).send('Invalid Token')
    // }
     //Get auth header value 
   const bearerHeader = req.headers['authorization'];
   //check if bearer is undifined
   if(typeof bearerHeader != 'undefined'){
    
       const bearer = bearerHeader.split(' ');
       //ghet token form array
       const bearerToekn = bearer[1];
       //set the token 
       try{
       const verified = jwt.verify(bearerToekn,process.env.TOKEN_SECRET);
       req.token = verified
       
       //next middleware
       next();
    }
    catch(err){
        res.status(400).send('Invalid Token')
    }
}
}