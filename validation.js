const Joi = require('@hapi/joi');

//Register Validatiion

const regtisterValidation = (data) => {
    const Schema = {
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required(),
        password: Joi.string()
        .min(6)
        .required(),
    };
    return Joi.validate(data, Schema);
    
};

//Login validator

const loginvalidator  = (data) => {

    const Schema = {
      
        email: Joi.string()
        .min(6)
        .required(),
        password:Joi.string()
        .min(6)
        .required(),
    };

    return Joi.validate(data, Schema);
};

const editvalidation = (data) => {
   // console.log('printedddddddddddddddddd   ')
    const Schema = {
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .required(),
    };
    return Joi.validate(data, Schema);
    
};

const PostValidation = (data) => {
    
    const Schema = {
        postBody: Joi.string()
        .min(6)
        .required(),
        postTitle: Joi.string()
        .min(6)
        .required(),
        userId: Joi.string()
        .required()
    };
    return Joi.validate(data, Schema);
    
};

const PosteditValidation = (data) => {
    
    const Schema = {
        postBody: Joi.string()
        .min(6)
        .required(),
        
    };
    return Joi.validate(data, Schema);
    
};

const commentvalidator  = (data) => {

    const Schema = {
      
        postBody: Joi.string()
        .required(),
        postId: Joi.string()
        .required(),

    };

    return Joi.validate(data, Schema);
};

module.exports.regtisterValidation = regtisterValidation;
module.exports.loginvalidator = loginvalidator;
module.exports.editvalidation = editvalidation;
module.exports.PostValidation = PostValidation;
module.exports.commentvalidator = commentvalidator;
module.exports.PosteditValidation = PosteditValidation;