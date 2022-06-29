import { Genre } from './../../genres/entities/genre.entity';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Band } from 'src/bands/entities/band.entity';

@ObjectType()
export class Track {
  @Field(() => ID)
  _id: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  albums: String;

  @Field(() => Int, { nullable: true })
  duration: number;

  @Field(() => Int, { nullable: true })
  released: number;

  @Field(() => [Band], { nullable: 'itemsAndList' })
  bands: Band[];

  @Field(() => [Genre], { nullable: 'itemsAndList' })
  genres: Genre;
}
