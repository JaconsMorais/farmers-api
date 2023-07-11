import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class Adduser extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'adduser'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const { default: User } = await import('App/Models/User')

    const name = await this.prompt.ask('Enter user name')

    const email = await this.prompt.ask('Enter user email')

    const password = await this.prompt.secure('Enter user password')

    const user = await User.create({ name, email, password })

    console.log(`User was created with id ${user.uuid}`)

    process.exit(0)
  }
}
