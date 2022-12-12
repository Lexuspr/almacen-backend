import { request, response } from 'express'
import Bus from '../models/bus.js'
import User from '../models/user.js'

const getBuses = async (req, res = response) => {
    const { limit = 50, from = 0 } = req.query

    Bus.findAll({ limit, from }, async (err, buses) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al buscar los buses'
            })
        }
        res.json({
            total: buses.length,
            buses
        })
    })
}

const getBus = async (req, res = response) => {
    const { id } = req.params
    Bus.findById(id, async (err, bus) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al buscar el bus'
            })
        }
        User.findById(bus.user_id, async (err, user) => {
            if (err) {
                return res.status(500).json({
                    msg: 'Error al buscar el usuario'
                })
            }

            bus.user_id = user.id
            res.json(bus)

        })
    })
}

const createBus = async (req, res = response) => {
    const { placa, user_id } = req.body

    Bus.insert({ placa, user_id }, async (err, bus) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al crear el bus'
            })
        }

        res.json(bus)
    })
}

const updateBus = async (req, res = response) => {
    const { id } = req.params
    const { placa, user_id } = req.body

    Bus.update({ id, placa, user_id }, async (err, bus) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al actualizar el bus'
            })
        }

        res.json(bus)
    })

}

const deleteBus = async (req, res = response) => {
    const { id } = req.params

    Bus.delete(id, async (err, bus) => {
        if (err) {
            return res.status(500).json({
                msg: 'Error al eliminar el bus'
            })
        }

        res.json(bus)
    })

}

export {
    getBuses,
    getBus,
    createBus,
    updateBus,
    deleteBus,
}