const express = require('express');
const { myInfo, validateRule } = require('../controllers/ruleValidation');
const router = express.Router();

router.get('/', myInfo);
router.post('/validate-rule', validateRule)

module.exports = router;