import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(100)]),
    email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(50)]),
    confirm_password: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(50), rules.confirmed('password')]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'name.required': 'The name is required',
    'name.maxLength': 'The name must be less than 100 characters',
    'email.required': 'The e-mail is required',
    'email.email': 'The e-mail must be valid',
    'email.unique': 'The e-mail is already registered',
    'password.required': 'The password is required',
    'password.minLength': 'The password must be at least 8 characters',
    'password.maxLength': 'The password must be less than 50 characters',
    'confirm_password.required': 'The confirmation of password is required',
    'confirm_password.confirmed': 'The confirmation of password must be equal to password',
  }
}
