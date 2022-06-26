import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Artist {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  secondName?: string;

  @Field({ nullable: true })
  middleName?: string;

  @Field({ nullable: true })
  birthDate?: string;

  @Field({ nullable: true })
  birthPlace?: string;

  @Field({ nullable: true })
  deathDate?: string;

  @Field({ nullable: true })
  deathPlace?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  bands?: string;

  @Field({ nullable: true })
  instruments?: string;

  @Field({ nullable: true })
  pseudonims?: string;

  @Field({ nullable: true })
  labels?: string;
}
