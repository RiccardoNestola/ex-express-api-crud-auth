const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postsController = require('../controllers/posts');
const authenticateToken = require("../middlewares/authenticateToken");

// GET /posts
router.get('/', postsController.index);

// GET /posts/:id
/* router.get('/:id', postsController.show); */
router.get('/:slug', postsController.show);

// POST /posts
router.post(
    '/',
    authenticateToken,
    body('title').notEmpty().withMessage('Il titolo è richiesto'),
    body('content').notEmpty().withMessage('Il contenuto è richiesto'),
    postsController.store
    );

// PUT /posts/:id
router.put('/:id', authenticateToken, postsController.update);

// DELETE /posts/:id
router.delete('/:id', authenticateToken, postsController.destroy);


module.exports = router;