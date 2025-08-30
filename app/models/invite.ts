import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Invitados extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare nombre: string

  @column()
  declare confirmado: number

  @column()
  declare n_invitados: number
}
