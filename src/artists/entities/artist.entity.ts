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
  deathDate?: string;

  @Field(() => String, { nullable: true })
  deathPlace?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  bands?: string;

  @Field(() => String, { nullable: true })
  instruments?: string;

  @Field(() => String, { nullable: true })
  pseudonims?: string;

  @Field(() => String, { nullable: true })
  labels?: string;
}
