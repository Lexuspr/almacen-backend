import Bus from '../models/bus.js'
import Category from '../models/category.js'
import Product from '../models/product.js'
import Role from '../models/role.js'
import User from '../models/user.js'

const isRoleValid = async (role = 'USER_ROLE') => {
    const existRole = await Role.findOne({ role })
    if (!existRole) {
        throw new Error(`El rol ${role} no se encuentra registrado en la BD`)
    }
}

const emailExists = async (email = '') => {
    User.findByEmail(email, (err, user) => {
        if (user) {
            throw new Error(`El email ${email} ya se encuentra registrado`)
        }
    })
}

const userExistsById = async (id) => {
    User.findById(id, (err, user) => {
        if (!user) {
            throw new Error(`El id ${id} no existe`)
        }
    })
}

const placaExists = async (placa = '') => {
    Bus.findByPlaca(placa, (err, bus) => {
        if (bus) {
            throw new Error(`La placa ${placa} ya se encuentra registrada`)
        }
    })
}

const busExistsById = async (id) => {
    Bus.findById(id, (err, bus) => {
        if (!bus) {
            throw new Error(`El id ${id} no existe`)
        }
    })
}

const categoryExistsById = async (id) => {
    const existCategory = await Category.findById(id)
    if (!existCategory) {
        throw new Error(`The id ${id} does not exist`)
    }
}

const productExistsById = async (id) => {
    const existProduct = await Product.findById(id)
    if (!existProduct) {
        throw new Error(`The id ${id} does not exist`)
    }
}

const validCollections = (collection = '', collections = []) => {
    const include = collections.includes(collection)
    if (!include) {
        throw new Error(`The collection ${collection} is not allowed. Allowed collections: ${collections}`)
    }
    return true
}

export {
    isRoleValid,
    emailExists,
    userExistsById,
    placaExists,
    busExistsById,
    categoryExistsById,
    productExistsById,
    validCollections
}