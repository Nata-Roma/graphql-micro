import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAlbumInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  released?: number;

  @Field(() => [ID], {nullable: 'itemsAndList' })
  artistsIds?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  bandsids?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  genresids?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  trackIds?: string[];

  @Field(() => String, { nullable: true })
  image?: string;
}
