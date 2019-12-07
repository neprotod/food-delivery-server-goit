const empty = require('is-empty');
const Comment = require('../models/сomments');

module.exports = {
    /**
     * Create comment
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async createComment(req, res){
        try{
            const comment = await Comment.saveComment(req.body);

            res.status(201).json({status: 'success', comment});
        }catch(e){
            console.error(e);

            res.status(400).json({errors:"Something wrong in database"});
        }
    },
    /**
     * Get comment
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async getComment(req, res){
        try{
            if(!req.query.productId){
                return res.status(400).json({errors:"No query product id"});
            }

            const comment = await Comment.getCommentById(req.query.productId);
            
            if(empty(comment)){
                return res.status(400).json({errors:"No comments"});
            }

            return res.status(200).json({status: 'success', comment});


        }catch(e){
            console.error(e);

            res.status(400).json({errors:"Something wrong in database"});
        }
    }
}