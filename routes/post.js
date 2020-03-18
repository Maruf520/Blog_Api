const router = require('express').Router();
const post = require('../models/Post');
const comment = require('../models/commnet');
const {PostValidation,PosteditValidation} = require('../validation');
const verify = require('./verifyToken');


router.post('/post',verify,(req,res) => {
            
            const{error} = PostValidation(req.body);
            if(error) return res.status(400).send(error.details[0].message);
            const userId = req.user;
            const newpost = new post({
                postBody: req.body.postBody,
                postTitle: req.body.postTitle,
                userId: req.body.userId
            });
            try{
                const post = newpost.save();
                return res.json("postId:"+newpost._id);
            }
            catch(err )
            {
                return status(400).send(err);
            }
        
    });

    router.post('/:postId/comment',async (req,res) => {
        const postt =await post.findOne({_id:req.params.postId}).populate('comments');
        const newcomment = new comment();
            newcomment.commentBody = req.body.commentBody;
            newcomment.postId = postt._id;
            
        
        await newcomment.save();
       await postt.comment.push(comment._id);
        await postt.save();
        return res.send(newcomment);
    });

    router.put('/:postId/update',async (req,res) => {
        const {error} = PosteditValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        console.log(req.body)
        const _id = req.params.postId; 
        console.log(_id);
        const p = post.findById({_id});
        console.log(p);
         post.findById({_id})
            //console.log(postt),
        .then(postt => {
        postt.postBody = req.body.postBody,
        postt.save()
            .then(user => {
                res.send({message: "Post has been Updated!!"})
            }).catch(err => console.log(err));
        });              

    });
    router.get('/:postId/comments',(req,res) => {
         const  comment = comment.findById()
    });
    router.get('/posts',async (req,res) => {
        const allpost =await post.find({});
        res.send(allpost);
    })

module.exports = router;