import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'
export default class UsersController {
  private isDev = Env.get('NODE_ENV') === 'development'
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page, limit } = request.qs()

      return User.query()
        .whereNull('deleted_at')
        .paginate(page ?? 0, limit ?? 10)
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.index: ${e.message}`)
        return e
      }

      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const { name, email, password } = request.body()

      const user = await User.create({ name, email, password })

      return user
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.store: ${e.message}`)
        return e.message
      }

      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
