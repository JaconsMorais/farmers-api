import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
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
    name: schema.string({ trim: true }, [rules.maxLength(100), rules.required()]),
    documentId: schema.string({ trim: true }, [rules.required(), rules.maxLength(18), rules.unique({ table: 'producers', column: 'document_id' }), rules.validDocument()]),
    city: schema.string({ trim: true }, [rules.maxLength(50)]),
    state: schema.string({ trim: true }, [rules.maxLength(2), rules.minLength(2), rules.validState()]),
    area: schema.number([rules.required()]),
    arableArea: schema.number([rules.required()]),
    unusedArea: schema.number([rules.required()]),
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
    'documentId.required': 'The documentId is required',
    'documentId.maxLength': 'The documentId must be less than 18 characters',
    'documentId.unique': 'The documentId is already registered',
    'city.maxLength': 'The city must be less than 50 characters',
    'state.maxLength': 'The state must be less than 2 characters',
    'state.minLength': 'The state must be at least 2 characters',
    'state.validState': 'The state must be a Brazillian valid state',
    'area.required': 'The area is required',
    'arableArea.required': 'The arableArea is required',
    'unusedArea.required': 'The unusedArea is required',
  }
}
