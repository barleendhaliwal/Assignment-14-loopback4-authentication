import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import { User } from './user.model';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  key?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Role>) {
    super(data);
  }

}

export interface RoleRelations {
  // describe navigational properties here
}

