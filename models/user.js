import { pool } from '../database/mysql.js'

const User = user => {
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.role = user.role
    this.google = user.google
    this.img = user.img
    this.state = user.state
}

User.insert = async (user, callback) => {
    try {
        const [rows] = await pool.query('INSERT INTO user SET ?', user)

        if (rows.affectedRows === 0) {
            console.log('Error al crear el usuario')
            callback('Error al crear el usuario', null)
            return
        }

        callback(null, { id: rows.insertId, ...user })
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

User.findById = async (id, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', id)
        const user = rows.length > 0 ? rows[0] : null
        callback(null, user)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

User.findByEmail = async (email, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', email)
        const user = rows.length > 0 ? rows[0] : null
        callback(null, user)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

User.findAll = async ({ limit = 10, from = 0 }, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user LIMIT ?, ?', [Number(from), Number(limit)])
        callback(null, rows)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

export default User
