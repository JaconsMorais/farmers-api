import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

/** Validators */
import StoreValidator from 'App/Validators/users/StoreValidator'
import UpdateValidator from 'App/Validators/users/UpdateValidator'
import { DateTime } from 'luxon'
export default class UsersController {
  private isDev = Env.get('NODE_ENV') === 'development'
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page, limit } = request.qs()

      return User.query()
        .whereNull('deleted_at')
        .paginate(page ?? 1, limit ?? 10)
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.index: ${e.message}`)
        return response.status(500).send(e)
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

      await request.validate(StoreValidator)

      const user = await User.create({ name, email, password })

      return user
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.store: ${e.message}`)
        return response.status(500).send(e)
      }

      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const { id } = params

      return await User.findByOrFail('uuid', id)
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.show: ${e.message}`)
        return e
      } else {
        response.status(500).json({ message: 'Internal server error' })
      }
    }
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    try {
      const { id } = params

      const { name, email, password } = request.body()

      await bouncer.with('UserPolicy').authorize('update', id)
      await request.validate(UpdateValidator)

      const user = await User.findByOrFail('uuid', id)

      user.merge({ name, email, password })

      await user.save()

      return { message: 'User updated successfully', user }
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.update: ${e.message}`)
        return response.status(500).send(e)
      } else return response.status(500).json({ message: 'Internal server error' })
    }
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    try {
      const { id } = params

      await bouncer.with('UserPolicy').authorize('delete', id)

      const user = await User.findByOrFail('uuid', id)

      user.merge({ deletedAt: DateTime.now() })

      await user?.save()

      return { message: 'User deleted successfully', user }
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in UsersController.destroy: ${e.message}`)
        return response.status(500).send(e)
      } else {
        response.status(500).json({ message: 'Internal server error' })
      }
    }
  }
}
