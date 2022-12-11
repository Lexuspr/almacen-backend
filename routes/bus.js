import { Router } from "express"
import { check } from "express-validator"
import { validateJWT, validateFields, isAdminRole } from "../middleware/validator.js"
import { getBuses, getBus, createBus, updateBus, deleteBus } from "../controllers/bus.js"
import { busExistsById, userExistsById } from "../helpers/db-validator.js"


const router = Router()

router.get('/', getBuses)

router.get('/:id', [
    check('id').custom(busExistsById),
    validateFields,
], getBus)

router.post('/', [
    validateJWT,
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    check('user_id', 'El usuario es obligatorio').not().isEmpty(),
    check('user_id').custom(userExistsById),
    validateFields,
], createBus)

router.put('/:id', [
    validateJWT,
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    check('id').custom(busExistsById),
    validateFields,
], updateBus)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom(busExistsById),
    validateFields,
], deleteBus)

export default router