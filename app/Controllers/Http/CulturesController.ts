import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Culture from 'App/Models/Culture'
import Env from '@ioc:Adonis/Core/Env'
import { DateTime } from 'luxon'
export default class CulturesController {
  private isDev = Env.get('NODE_ENV') === 'development'

  public async index({ response }: HttpContextContract) {
    try {
      return await Culture.all()
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in CulturesController.index: ${e.message}`)
        return e
      }

      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const { name } = request.all()

      const culture = await Culture.create({ name })

      return culture
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in CulturesController.create: ${e.message}`)
        return e
      }

      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const { id } = request.params()
      return await Culture.query().where('uuid', id).firstOrFail()
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in CulturesController.show: ${e.message}`)
        return e
      }

      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async update({ response, request, params }: HttpContextContract) {
    try {
      const { name } = request.all()
      const { id } = params

      const culture = await Culture.findByOrFail('uuid', id)
      culture.merge({ name })

      await culture.save()

      return culture
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in CulturesController.update: ${e.message}`)
        return e
      }

      return response.status(500).send({ message: 'Internal server error' })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const { id } = params

      const culture = await Culture.findByOrFail('uuid', id)
      culture.merge({ deletedAt: DateTime.now() })

      await culture.save()

      return culture
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in CulturesController.destroy: ${e.message}`)
        return e
      }

      return response.status(500).send({ message: 'Internal server error' })
    }
  }
}
