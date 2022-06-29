import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field(() => String)
  title: string;

  @Field(() => ID, {nullable: true})
  albumId: string;

  @Field(() => Int)
  duration: number;

  @Field(() => Int)
  released: number;

  @Field(() => [String], { nullable: 'itemsAndList' })
  bandsIds: string[];

  @Field(() => [String])
  genresIds: string[];
}
