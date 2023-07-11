import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  private isDev = Env.get('NODE_ENV') === 'development'
  public async index({}: HttpContextContract) {}

  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()

    try {
      await auth.use('web').attempt(email, password)

      return auth.user
    } catch (error) {
      if (this.isDev) {
        console.error(`There is an error in AuthController.store: ${error.message}`)

        return response.status(500).send({ message: error.message })
      }
      response.status(401).send({ message: 'Invalid credentials' })
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
