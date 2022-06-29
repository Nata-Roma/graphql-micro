import { Genre } from './../../genres/entities/genre.entity';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Track } from 'src/tracks/entities/track.entity';

@ObjectType()
export class Album {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], { name: 'artists', nullable: 'itemsAndList' })
  artistsIds?: string[];

  @Field(() => [ID], { name: 'bands', nullable: 'itemsAndList' })
  bandsIds?: string[];

  @Field(() => [ID], { name: 'genres', nullable: 'itemsAndList' })
  genresIds?: string[];

  @Field(() => [ID], { name: 'tracks', nullable: 'itemsAndList' })
  trackIds?: string[];

  @Field(() => String, { nullable: true })
  image?: string;
}
