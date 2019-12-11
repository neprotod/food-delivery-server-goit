const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const сommentsShema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    text: {
        type: String,
        default: 0,
        required: true
    },
    mark: {
        type: Number,
        required: true
    }
  },
  {timestamps: true});

const Comment = mongoose.model('сomments', сommentsShema);

module.exports = {
    /**
     * Save comment
     * 
     * @param {*} data data to save
     */
    async saveComment(data){
        const comment = new Comment(data);
        
        return await comment.save();

    },
    /**
     * Save comment
     * 
     * @param {*} data data to save
     */
    async getCommentById(id){
        return await Comment.findById(id);
    }
}