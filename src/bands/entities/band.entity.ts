import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Member } from './member.entity';

@ObjectType()
export class Band {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  origin?: string;

  @Field(() => [Member], { nullable: 'itemsAndList' })
  members?: Member[];

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => [ID], { name: 'genres', nullable: 'itemsAndList' })
  genresIds?: string[];
}
