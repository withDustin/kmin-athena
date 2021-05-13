import { Field, ObjectType } from '@nestjs/graphql'
import { prop } from '@typegoose/typegoose'

import { Classwork, ClassworkType } from './Classwork'

@ObjectType({ implements: [Classwork] })
export class ClassworkMaterial extends Classwork {
  @Field()
  @prop({ required: true, default: ClassworkType.Material })
  type: string
}
