import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producer from 'App/Models/Producer'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

/** Validators */
import StoreValidator from 'App/Validators/users/StoreValidator'
import UpdateValidator from 'App/Validators/users/UpdateValidator'
import DeleteValidator from 'App/Validators/users/DeleteValidator'
import { DateTime } from 'luxon'
export default class ProducersController {
  private isDev = Env.get('NODE_ENV') === 'development'

  /**
   * GET /users/:userId/producers
   * @param userId user's uuid
   * @queryParam page page number
   * @queryParam limit limit of items per page
   * @returns user's producers
   */
  public async index({ request, response, params, bouncer }: HttpContextContract) {
    const { userId } = params
    const { page, limit } = request.qs()
    try {
      await bouncer.with('ProducerPolicy').authorize('viewList', params?.userId)

      const user = await User.findByOrFail('uuid', userId)

      return await Producer.query()
        .where('userId', user.id)
        .preload('farms')
        .paginate(page ?? 1, limit ?? 10)
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in ProducersController.index: ${e.message}`)
        return response.status(500).send({ message: e.message })
      } else return response.status(500).send({ message: 'Internal server error' })
    }
  }

  /**
   *
   * POST /users/:userId/producers
   * @param userId user's uuid
   * @prop documentId producer's CPF or CNPJ
   * @prop name producer's name
   * @prop city producer's city
   * @prop state producer's state
   */

  public async store({ request, response, params, bouncer }: HttpContextContract) {
    const { userId } = params
    const { documentId, name, city, state } = request.body()

    try {
      await bouncer.with('ProducerPolicy').authorize('create', params?.userId)
      await request.validate(StoreValidator)

      return await Producer.create({ documentId, name, city, state, userId })
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in ProducersController.store: ${e.message}`)
        return { message: e.message }
      } else return response.status(500).send({ message: 'Internal server error' })
    }
  }

  /**
   * GET /users/:userId/producers/:producerId
   * @param userId user's uuid
   * @param producerId producer's uuid
   *
   */
  public async show({ params, bouncer, response, request }: HttpContextContract) {
    const { userId, producerId } = params
    try {
      await bouncer.with('ProducerPolicy').authorize('view', params?.userId)

      return await Producer.query()
        .whereHas('user', (query) => {
          query.where('uid', userId)
        })
        .where('uuid', producerId)
        .first()
    } catch (error) {
      if (this.isDev) {
        console.error(`There is an error in ProducersController.show: ${error.message}`)
        return error
      }

      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async update({ request, bouncer, params, response }: HttpContextContract) {
    const { userId, producerId } = params
    const { documentId, name, city, state } = request.body()

    try {
      await bouncer.with('ProducerPolicy').authorize('create', userId)
      await request.validate(UpdateValidator)

      const producer = await Producer.findByOrFail('uuid', producerId)
      producer.merge({ documentId, name, city, state, userId })

      await producer.save()

      return producer
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in ProducersController.update: ${e.message}`)
        return { message: e.message }
      } else return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async destroy({ bouncer, request, response, params }: HttpContextContract) {
    const { userId, producerId } = params

    try {
      await bouncer.with('ProducerPolicy').authorize('create', userId)
      await request.validate(UpdateValidator)

      const producer = await Producer.findByOrFail('uuid', producerId)
      producer.merge({ deletedAt: DateTime.now() })

      await producer.save()

      return producer
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in ProducersController.destroy: ${e.message}`)
        return { message: e.message }
      } else return response.status(500).send({ message: 'Internal server error' })
    }
  }
}
