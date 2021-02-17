import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

import { User } from '../models/CreateUser'

class UserController {
    async store(req: Request, res: Response){
        const repository = getRepository(User)

        const { name, email, password } = req.body

        const userExists = await repository.findOne({where: {email}})

        if(userExists){
            return res.sendStatus(409)
        }

        const user = repository.create({name, email, password})
        await repository.save(user)

        return res.json(user)
    }

    async index(req: Request, res: Response){
        return res.status(200).json({message: 'Hello user'})
    }

    async forgot(req: Request, res: Response){
       const { email } = req.body

       try {
          const user = await getRepository(User).find({
              where: {
                  email
              }
          })

          const newPassword = crypto.randomBytes(4).toString('hex')

          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: 'mathews20104540@gmail.com',
              pass: '24563930a'
            }
          })

          const data = {
            to: email,
            from: 'Administrador',
            subject: 'Recuperação de senha',
            html: `<p>Olá a sua nova senha é ${newPassword}</p>`
          }

          transporter.sendMail(data, async () => {
              const password = await bcrypt.hash(newPassword, 8)

              getRepository(User).update(user[0].id, {
                  password
              }).then(() => {
                return res.status(200).json({ message: `google senha foi enviado para o email: ${email}.` })
              }).catch(() => {
                return res.status(404).json({message: 'user not found'})
              })
          })

       }catch(err){
           return res.status(404).json({ message: 'User not found' })
       } 
    } 
}

export default new UserController()