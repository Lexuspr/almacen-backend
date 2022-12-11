import { Router } from "express"
import { check } from "express-validator"
import { validateJWT, validateFields, isAdminRole } from "../middleware/validator.js"
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.js"
import { categoryExistsById, productExistsById } from "../helpers/db-validator.js"


const router = Router()

router.get('/', getProducts)

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productExistsById),
    validateFields,
], getProduct)

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un ID válido').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields,
], createProduct)

router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(productExistsById),
    validateFields,
], updateProduct)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productExistsById),
    validateFields,
], deleteProduct)

export default router