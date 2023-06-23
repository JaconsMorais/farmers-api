import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Culture from 'App/Models/Culture'

const availableCultures = [
  'Soja',
  'Milho',
  'Algodão',
  'Café',
  'Cana de Açucar',
  'Trigo',
  'Arroz',
  'Feijão',
  'Batata',
  'Tomate',
]

export default class extends BaseSeeder {
  public async run() {
    try {
      const cultures = await Culture.all()

      const notIncludedCultures = selectNotIncludedCultures(availableCultures, cultures)

      if (notIncludedCultures.length)
        await Promise.all(notIncludedCultures.map((culture) => Culture.create({ name: culture })))

      console.log(`CulturesSeeder completed with ${notIncludedCultures.length} insertions`)
    } catch (e) {
      console.error(`There is an error in CulturesSeeder: ${e.message}`)
    }
  }
}

const selectNotIncludedCultures = (availableCultures: string[], cultures: Culture[]) => {
  return availableCultures.filter(
    (culture) => !cultures.some((c) => c.$attributes.name === culture)
  )
}
