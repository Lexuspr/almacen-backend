import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const validateFields = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la petición' })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY)
    User.findById(uid, (err, user) => {
      if (err) {
        return res.status(401).json({ msg: 'Token no válido' })
      }

      if (!user) {
        return res.status(401).json({ msg: 'Token no válido - usuario no existe' })
      }

      if (!user.state) {
        return res.status(401).json({ msg: 'Token no válido - usuario desactivado' })
      }

      req.user = user
      next()
    })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ msg: 'Token no válido' })
  }
}

const isAdminRole = (req, res, next) => {
  const { user } = req
  if (user.role !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: 'No tiene privilegios para realizar esta acción' })
  }
  next()
}

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ msg: 'No tiene privilegios para realizar esta acción' })
    }
    next()
  }
}

export { validateFields, validateJWT, isAdminRole, hasRole }