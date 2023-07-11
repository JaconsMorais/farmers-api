import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'

export default (query: ModelQueryBuilderContract<any>) => {
  if ('whereNull' in query) {
    query.whereNull('deleted_at')
  }
}
