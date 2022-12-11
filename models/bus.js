import { pool } from '../database/mysql.js'

const Bus = bus => {
    this.id = bus.id
    this.placa = bus.placa
    this.user_id = bus.user_id
}

Bus.insert = async (bus, callback) => {
    try {
        const [rows] = await pool.query('INSERT INTO bus SET ?', bus)

        if (rows.affectedRows === 0) {
            console.log('Error al crear bus')
            callback('Error al crear bus', null)
            return
        }

        callback(null, { id: rows.insertId, ...bus })
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Bus.findById = async (id, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM bus WHERE id = ?', id)
        const bus = rows.length > 0 ? rows[0] : null
        callback(null, bus)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Bus.findByPlaca = async (placa, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM bus WHERE placa = ?', placa)
        const bus = rows.length > 0 ? rows[0] : null
        callback(null, bus)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Bus.findAll = async ({ limit = 10, from = 0 }, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM bus LIMIT ?, ?', [Number(from), Number(limit)])
        callback(null, rows)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Bus.update = async (bus, callback) => {
    try {
        const [rows] = await pool.query('UPDATE bus SET placa = ? WHERE id = ?', [bus.placa, bus.id])

        if (rows.affectedRows === 0) {
            console.log('Error al actualizar bus')
            callback('Error al actualizar bus', null)
            return
        }

        callback(null, bus)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Bus.delete = async (id, callback) => {
    try {
        const [rows] = await pool.query('DELETE FROM bus WHERE id = ?', id)

        if (rows.affectedRows === 0) {
            console.log('Error al eliminar bus')
            callback('Error al eliminar bus', null)
            return
        }

        callback(null, { id })
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

export default Bus
