import { request, response } from 'express'
import bcryptjs from 'bcryptjs'
import generateJWT from '../helpers/generate-jwt.js'
import User from '../models/user.js'

const userGet = async (req = request, res = response) => {
    const { limit = 10, from = 0 } = req.query

    User.findAll({ limit, from }, async (err, users) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al buscar los usuarios'
            })
        }
        res.json({
            total: users.length,
            users
        })
    })
}

const userPost = async (req, res = response) => {
    const { name, email, password, role } = req.body
    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    const encryptedPassword = bcryptjs.hashSync(password, salt)

    User.insert(
        { name, email, password: encryptedPassword, role: role ? role : 'USER_ROLE' }
        , async (err, user) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al crear el usuario'
            })
        }
        // Generate JWT
        const token = await generateJWT(user.id)

        User.findById(user.id, async (err, user) => {
            if (err) {
                return res.status(500).json({
                    msg: 'Error al buscar el usuario'
                })
            }
            res.json({
                user,
                token
            })
        })
    })
}

export {
    userGet,
    userPost
}