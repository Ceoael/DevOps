const express = require('express');

const telescopeController = require('../controllers/telescope');

const router = express.Router();

router.get('/', telescopeController.getTelescopes);
router.get('/:id', telescopeController.getTelescope);
router.put('/:id', telescopeController.putTelescope);
router.delete('/:id', telescopeController.deleteTelescope);
router.post('/', telescopeController.postTelescope);

module.exports = router;
