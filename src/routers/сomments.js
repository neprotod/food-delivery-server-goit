const {Router} = require('express');
const route = Router();

const controller = require('../controllers/comments');
const commentValidation = require('../validation/comments');

// Save comment
route.post('/', commentValidation.saveComment, controller.createComment);

// Get comment by id
route.get('/', controller.getComment);

module.exports = route;