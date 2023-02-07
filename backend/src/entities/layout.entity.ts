import { Entity, Property, PrimaryKey, JsonType } from '@mikro-orm/core'
import { ObjectId } from '@mikro-orm/mongodb';
import IGridLayoutDefinition from '../../shared/@types/grid-layout.interface';

@Entity()
export default class LayoutEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @Property({ unique: true })
  name!: string;

  @Property({ type: JsonType })
  layout!: IGridLayoutDefinition;
}

