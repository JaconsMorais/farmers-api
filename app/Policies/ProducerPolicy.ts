import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Producer from 'App/Models/Producer'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class ProducerPolicy extends BasePolicy {
  public async viewList(user: User, userId: string) {
    return user?.uuid === userId
  }
  public async view(user: User, userId: string) {
    return user?.uuid === userId
  }
  public async create(user: User, userId: string) {
    return user?.uuid === userId
  }
  public async update(user: User, userId: string) {
    return user?.uuid === userId
  }
  public async delete(user: User, userId: string) {
    return user?.uuid === userId
  }
}
