import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
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
