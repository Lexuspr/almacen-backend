import { pool } from "../database/mysql.js"

const Rol = rol => {
    this.nombre = rol.nombre
}

Rol.insert = async (rol, callback) => {
    try {
        const [rows] = await pool.query('INSERT INTO rol SET ?', rol)

        if (rows.affectedRows === 0) {
            console.log('Error al crear rol')
            callback('Error al crear rol', null)
            return
        }

        callback(null, { id: rows.insertId, ...rol })
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Rol.findById = async (id, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rol WHERE id = ?', id)
        const rol = rows.length > 0 ? rows[0] : null
        callback(null, rol)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Rol.findByNombre = async (nombre, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rol WHERE nombre = ?', nombre)
        const rol = rows.length > 0 ? rows[0] : null
        callback(null, rol)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Rol.findAll = async ({ limit = 10, from = 0 }, callback) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rol LIMIT ?, ?', [Number(from), Number(limit)])
        callback(null, rows)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Rol.update = async (rol, callback) => {
    try {
        const [rows] = await pool.query('UPDATE rol SET nombre = ? WHERE id = ?', [rol.nombre, rol.id])

        if (rows.affectedRows === 0) {
            console.log('Error al actualizar rol')
            callback('Error al actualizar rol', null)
            return
        }

        callback(null, bus)
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

Rol.delete = async (id, callback) => {
    try {
        const [rows] = await pool.query('DELETE FROM rol WHERE id = ?', id)

        if (rows.affectedRows === 0) {
            console.log('Error al eliminar rol')
            callback('Error al eliminar rol', null)
            return
        }

        callback(null, { id })
    } catch (error) {
        console.log(error)
        callback(error, null)
    }
}

export default Rol