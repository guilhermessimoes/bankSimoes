var express = require('express');
var router = express.Router();
const accountController = require('../controllers/accountController');
const verifyLogin = require('../middlewares/session') 

router.get('/', verifyLogin, accountController.accountGet)

router.get('/deposit', verifyLogin, accountController.depositGet)
router.post('/deposit', verifyLogin, accountController.depositPost)

router.get('/withdraw', verifyLogin, accountController.withdrawGet)
router.post('/withdraw', verifyLogin, accountController.withdrawPost)

router.get('/transfer', verifyLogin, accountController.transferGet)
router.post('/transfer', verifyLogin, accountController.transferPost)



module.exports = router;