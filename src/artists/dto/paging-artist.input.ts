import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class PagingArtistInput {
  @Field(() => Int, { nullable: true })
  @Min(0)
  offset = 0;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(25)
  limit = 5;
}
