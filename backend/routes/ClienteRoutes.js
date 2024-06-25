const router = require ('express').Router()

const ClienteController =
require('../controllers/ClienteController')

router.post('/registrar', ClienteController.registrar)
router.post('/login', ClienteController.login)

module.exports = router