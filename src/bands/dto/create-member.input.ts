import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
    @Field(() => String, { nullable: true })
    artist?: string;
  
    @Field(() => String, { nullable: true })
    instrument?: string;
  
    @Field(() => [String], { nullable: 'itemsAndList' })
    years?: string[];
}