import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class AddFavouriteInput {
  @Field(() => String)
  type: 'bands' | 'genres' | 'artists' | 'tracks';

  @Field(() => ID)
  id: string;
}
