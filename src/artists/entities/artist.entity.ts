import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  secondName?: string;

  @Field(() => String, { nullable: true })
  middleName?: string;

  @Field(() => String, { nullable: true })
  birthDate?: string;

  @Field(() => String, { nullable: true })
  birthPlace?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  bands?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  instruments?: string[];
}
