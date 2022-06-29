import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Band {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  origin?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  members?: string[];

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => [ID], { name: 'genres', nullable: 'itemsAndList' })
  genresIds?: string[];
}
