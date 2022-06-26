import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID) //<- GraphQL
  _id: string; //<- TypeScript

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  secondName: string;

  @Field({ nullable: true })
  middleName?: string;
  
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}
