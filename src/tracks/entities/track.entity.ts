import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => ID, { name: 'album', nullable: true })
  albumsId: string;

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => [ID], { name: 'bands', nullable: 'itemsAndList' })
  bandsIds: string[];

  @Field(() => [ID], { name: 'genres', nullable: 'itemsAndList' })
  genresIds: string[];

  @Field(() => [ID], { name: 'artists', nullable: 'itemsAndList' })
  artistsIds: string[];
}
