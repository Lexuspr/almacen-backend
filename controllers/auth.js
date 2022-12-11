import { response } from 'express'
import bcryptjs from 'bcryptjs'
import generateJWT from '../helpers/generate-jwt.js'
import googleVerify from '../helpers/google-verify.js'
import User from '../models/user.js'

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    User.findByEmail(email, async (err, user) => {
      if (err) {
        return res.status(500).json({
          msg: 'Error al buscar el usuario'
        })
      }

      if (!user) {
        return res.status(400).json({
          msg: 'User / Password are not correct - email'
        })
      }

      // Check if user is active
      if (!user.state) {
        return res.status(400).json({
          msg: 'User / Password are not correct - state: false'
        })
      }

      // Check password
      const validPassword = bcryptjs.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({
          msg: 'User / Password are not correct - password'
        })
      }

      // Generate JWT
      const token = await generateJWT(user.id)

      res.json({
        user,
        token
      })
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Error del servidor. Por favor, contacte al administrador.'
    })
  }

}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body
    
    try {
        const { name, email } = await googleVerify(id_token)

        User.findByEmail(email, async (err, user) => {
          if (err) {
            return res.status(500).json({
              msg: 'Error al buscar el usuario'
            })
          }

          if (user) {
            // If user is not active
            if (!user.state) {
              return res.status(401).json({
                msg: 'User is not active'
              })
            }
            // Generate JWT
            const token = await generateJWT(user.id)
            res.json({
              user,
              token
            })
          } else {
            const newUser = new User({
              name,
              email,
              password: ':P',
              google: true
            })

            User.insert(newUser, async (err, user) => {
              if (err) {
                return res.status(500).json({
                  msg: 'Error al crear el usuario'
                })
              }
              // Generate JWT
              const token = await generateJWT(user.id)
              res.json({
                user,
                token
              })
            })
          }
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }
}

const validateUserToken = async (req, res = response) => {
    const token = await generateJWT(req.user.id)

    res.json({
        user: req.user,
        token
    })
}

export { login, googleSignIn, validateUserToken }