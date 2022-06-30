import { InputType, Field, ID } from '@nestjs/graphql';
import { Member } from '../entities/member.entity';
import { CreateMemberInput } from './create-member.input';

@InputType()
export class CreateBandInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  origin?: string;

  @Field(() => [CreateMemberInput], { nullable: 'itemsAndList' })
  members?: CreateMemberInput[];

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  genresIds?: string[];
}
