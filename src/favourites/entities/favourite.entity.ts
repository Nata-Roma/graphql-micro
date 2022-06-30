import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Favourite {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [ID], {name: "bands"})
  bandsIds: string[];

  @Field(() => [ID], {name: "genres"})
  genresIds: string[];

  @Field(() => [ID], {name: "artists"})
  artistsIds: string[];

  @Field(() => [ID], {name: "tracks"})
  tracksIds: string[];
}
