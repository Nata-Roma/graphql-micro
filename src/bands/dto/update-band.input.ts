import { CreateBandInput } from './create-band.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBandInput extends PartialType(CreateBandInput) {
  @Field(() => ID)
  _id: string;
}
