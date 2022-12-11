import { Router } from "express"
import { check } from "express-validator"
import { validateJWT, validateFields, isAdminRole } from "../middleware/validator.js"

import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from "../controllers/category.js"
import { categoryExistsById } from "../helpers/db-validator.js"


const router = Router()

router.get('/', getCategories)

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
], getCategory)

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
], createCategory)

router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validateFields,
], updateCategory)

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
], deleteCategory)

export default router