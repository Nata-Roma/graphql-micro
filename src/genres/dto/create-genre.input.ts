import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => Int, { nullable: true })
  year?: number;
}
