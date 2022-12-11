import { Router } from 'express'
import { check } from 'express-validator'
import { isRoleValid, emailExists, userExistsById } from '../helpers/db-validator.js'
import { userGet, userPost } from '../controllers/user.js'
import { validateFields } from '../middleware/validator.js'

const router = Router()

router.get('/', userGet)

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'The email is required').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isRoleValid),
    validateFields
], userPost)

export default router
