import { CreateAlbumInput } from './create-album.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAlbumInput extends PartialType(CreateAlbumInput) {
  @Field(() => ID)
  _id: string;
}
