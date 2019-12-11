const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ingredientsShema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
  },
  {timestamps: true});

module.exports = mongoose.model('ingredients', ingredientsShema);