import { response } from "express"
import Product from "../models/product.js"

const getProducts = async (req, res = response) => {
    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        products
    })
}

const getProduct = async (req, res = response) => {
    const { id } = req.params
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

    res.json(product)
}

const createProduct = async (req, res = response) => {
    const { state, user, ...body } = req.body

    const productDB = await Product.findOne({ name: body.name.toUpperCase() })

    if (productDB) {
        return res.status(400).json({
            msg: `El producto ${productDB.name}, ya existe`
        })
    }

    // Generate data to save
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product(data)

    // Save DB
    const newProduct = await product.save()
    console.log(newProduct)
    await newProduct
        .populate('user', 'name')
        //.populate('category', 'name')

    res.status(201).json(newProduct)
}

const updateProduct = async (req, res = response) => {
    const { id } = req.params
    const { state, user, ...data } = req.body

    if (data.name) {
        data.name = data.name.toUpperCase()
    }

    data.user = req.user._id

    const product = await Product.findByIdAndUpdate(id, data, { new: true })
        .populate('user', 'name')
        .populate('category', 'name')

    res.json(product)
}

const deleteProduct = async (req, res = response) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true })

    res.json(product)
}

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
                          











                                                                                                                                                 