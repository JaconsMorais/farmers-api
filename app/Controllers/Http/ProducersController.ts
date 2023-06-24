import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producer from 'App/Models/Producer'
import Env from '@ioc:Adonis/Core/Env'
export default class ProducersController {
  private isDev = Env.get('NODE_ENV') === 'development'

  /**
   * 
   * @param userId user's uuid
   * @queryParam page page number
   * @queryParam limit limit of items per page 
   * @returns user's producers
   */
  public async index({ request, response, params }: HttpContextContract) {
    const { userId } = params
    const { page, limit } = request.qs()
    try {
      return await Producer
        .query()
        .whereHas('user', (query) => { query.where('uuid', userId) })
        .preload('farms')
        .paginate(page ?? 0, limit ?? 10)

    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in ProducersController.index: ${e.message}`)
        return e
      } else
        return response.status(500).send({ message: 'Internal server error' })
    }
  }


  public async store({ request, response, params }: HttpContextContract) {
    const { userId } = params
    const { documentId, name, city, state } = request.body()

    try {

      return await Producer.create({ documentId, name, city, state, userId })

    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in ProducersController.store: ${e.message}`)
        return e
      } else
        return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async show({ }: HttpContextContract) { }


  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
