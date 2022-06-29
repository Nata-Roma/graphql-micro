import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class RemoveFromFavouriteInput {
  @Field(() => String)
  type: 'bands' | 'genres' | 'artists' | 'tracks';

  @Field(() => ID)
  id: string;
}
