import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  secondName?: string;

  @Field(() => String, { nullable: true })
  middleName?: string;

  @Field(() => String, { nullable: true })
  birthDate?: string;

  @Field(() => String, { nullable: true })
  birthPlace?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => [ID], { nullable: 'itemsAndList' })
  bands?: string[];

  @Field(() => [ID], { nullable: 'itemsAndList' })
  instruments?: string[];
}
