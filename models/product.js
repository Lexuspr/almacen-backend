import { Schema, model } from 'mongoose'

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
})

productSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject()
    return data
}

export default model('Product', productSchema)