import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBandInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  origin?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  members?: string[];

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
