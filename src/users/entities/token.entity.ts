import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String)
  jwt: string;
}
