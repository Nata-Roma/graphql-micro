import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field(() => String)
  title: string;

  @Field(() => ID, {nullable: true})
  albumId: string;

  @Field(() => Int, {nullable: true})
  duration: number;

  @Field(() => Int, {nullable: true})
  released: number;

  @Field(() => [String], { nullable: 'itemsAndList' })
  bandsIds: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  genresIds: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  artistsIds: string[];
}
