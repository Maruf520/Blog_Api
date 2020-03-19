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
        const postt = await post.findOne({_id:req.params.postId});
        console.log(postt);
        const newcomment = new comment();
            newcomment.commentBody = req.body.commentBody;
            newcomment.postId = postt._id;

                await newcomment.save();
                console.log("commentId: "+newcomment._id+"  "+"PostId: "+newcomment.postId);
                const ddd = newcomment._id;

                var obj = [{
                    'commentId': newcomment._id,
                    'commentBody':newcomment.commentBody,
                }];
                // var obj =  {
                //     commmentId : newcomment._id,
                //     commentBody: newcomment.commentBody
                // }
               postt.comments.push(obj);
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
        .then(postt => {
        postt.postBody = req.body.postBody,
        postt.save()
            .then(user => {
                res.send({message: "Post has been Updated!!"})
            }).catch(err => console.log(err));
        });              

    });

    router.post('/:postId/delete',async (req,res) => {
        const dltpost =await post.findById({_id:req.params.postId});

        if(dltpost)
        {
           await post.findByIdAndDelete({_id:req.params.postId});
            res.send('deleted');
        }
        else
        {
            res.status(400).json({message:"post not found"});
        }

    });
    router.get('/:postId/comments',(req,res) => {
         const  comment = comment.findById()
    });
    router.get('/posts',async (req,res) => {
        const allpost = await post.find({});
        res.send(allpost);
    })

module.exports = router;