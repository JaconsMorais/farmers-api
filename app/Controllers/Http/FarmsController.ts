import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
export default class FarmsController {
  public async index({ }: HttpContextContract, farm: Farm) {
    return { farm };
  }


  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract, farm: Farm) {
    return { farm };
  }


  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
