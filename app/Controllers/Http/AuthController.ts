import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  private isDev = Env.get('NODE_ENV') === 'development'

  public async index({ auth, response }: HttpContextContract) {
    try {
      return auth.user;
    } catch (error) {
      if (this.isDev) {
        console.error(`There is an error in AuthController.index: ${error.message}`)
        return response.status(500).send({ message: error.message })
      }

      return response.status(500).json({ message: 'Internal server error' })
    }
  }

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

  public async destroy({ auth, response }: HttpContextContract) {
    try {
      return await auth.use('web').logout()
    } catch (error) {
      if (this.isDev) {
        console.error(`There is an error in AuthController.destroy: ${error.message}`)
        return response.status(500).send({ message: error.message })
      }
      response.status(401).send({ message: 'Invalid credentials' })
    }
  }
}
