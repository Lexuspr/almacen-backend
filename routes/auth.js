import Router from 'express'
import { check } from 'express-validator'
import { validateUserToken, login, googleSignIn } from '../controllers/auth.js'
import { validateFields, validateJWT } from '../middleware/validator.js'

const router = Router()

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login)

router.post('/google', [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validateFields
], googleSignIn)

router.get('/', [
    validateJWT,
], validateUserToken)

export default router