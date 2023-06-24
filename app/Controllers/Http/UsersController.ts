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


  /**
   * POST /users
   * @param name, email, password 
   * @returns User created
   */
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

  public async show({ params, response }: HttpContextContract) {
    try {
      const { id } = params

      return await User.findOrFail(id)
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.show: ${e.message}`)
        return e
      } else {
        response.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const { id } = params;

      const { name, email, password } = request.body()

      const user = await User.query().where('uuid', id).update({ name, email, password })

      return { message: 'User updated successfully', user }
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.update: ${e.message}`)
        return e
      } else
        return response.status(500).json({ message: 'Internal server error' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const { id } = params

      await User.query().where('uuid', id).update({ deletedAt: new Date() })

      return { message: 'User deleted successfully' }
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.destroy: ${e.message}`)
        return e
      } else {
        response.status(500).json({ message: 'Internal server error' })
      }
    }
  }
}
