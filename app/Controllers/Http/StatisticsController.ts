import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
import Producer from 'App/Models/Producer'
import User from 'App/Models/User'
export default class StatisticsController {
  public async totalFarms({ response, params }: HttpContextContract) {
    try {
      const { userId } = params

      const [{ $extras: totalFarms }] = await Producer.query().whereHas('user', query => { query.where('uuid', userId) }).count('* as totalFarms')


      return totalFarms
    } catch (e) {
      response.status(500).send(e.message)
    }
  }

  public async totalAreas({ response, params }: HttpContextContract) {
    try {
      const { userId } = params

      const [{ $extras: totalAreas }] = await Farm.query().whereHas('producer', query => { query.whereHas('user', query => { query.where('uuid', userId) }) }).sum('area as totalAreas')

      return totalAreas
    }
    catch (e) {
      response.status(500).send(e.message)
    }
  }

  public async totalStateProducers({ response, params }: HttpContextContract) {
    try {
      const { userId } = params

      const totals = await Producer.query().whereHas('user', query => { query.where('uuid', userId) }).select('state').groupBy('state').count('state as totalProducers')

      return totals.map(({ $extras, $attributes }) => ({ [$attributes.state]: Number($extras.totalProducers) }))
    }
    catch (e) {
      response.status(500).send(e.message)
    }
  }

  public async totalAreaUse({ response, params }: HttpContextContract) {
    try {
      const { userId } = params

      const [{ $extras: totalAreaUse }] = await Farm
        .query().whereHas('producer', query => { query.whereHas('user', query => { query.where('uuid', userId) }) })
        .sum('area as totalArea')
        .sum('arable_area as totalUsed')
        .sum('unused_area as totalUnused')

      return totalAreaUse
    }
    catch (e) {
      response.status(500).send(e.message)
    }
  }

}
