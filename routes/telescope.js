const express = require('express');

const telescopeController = require('../controllers/telescope');

const router = express.Router();

router.get('/', telescopeController.getTelescopes);
router.get('/:id', telescopeController.getTelescope);
router.post('/', telescopeController.postTelescope);

module.exports = router;
