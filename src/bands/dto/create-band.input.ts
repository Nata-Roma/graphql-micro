import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBandInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  origin?: string;

  @Field(() => String, { nullable: true })
  yearsActive?: string;

  @Field(() => String, { nullable: true })
  labels?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  members?: string[];

  @Field(() => String, { nullable: true })
  pastMembers?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => String, { nullable: true })
  genres?: string;

  @Field(() => String, { nullable: true })
  logo?: string;
}
