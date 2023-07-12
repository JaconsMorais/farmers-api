import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
import Env from '@ioc:Adonis/Core/Env'
import Producer from 'App/Models/Producer';
export default class FarmsController {
  private isDev = Env.get('NODE_ENV') === 'development'

  public async update({ request, params, response }: HttpContextContract) {
    const { producerId, id } = params;

    try {
      const producer = await Producer.findByOrFail('uuid', producerId);

      const farm = await Farm.query().where('uuid', id).where('producerId', producer.id).firstOrFail();

      farm.merge(request.body())

      await farm.save();

      return farm;
    } catch (e) {
      if (this.isDev) {
        console.error(`There is an error in FarmsController.update: ${e.message}`)
        return e
      }

      return response.status(500).send({ message: 'Internal server error' })
    }
  }
}
