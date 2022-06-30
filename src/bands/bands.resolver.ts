import { PagingBandInput } from './dto/paging-band.input';
import { GenresService } from './../genres/genres.service';
import { Genre } from './../genres/entities/genre.entity';
import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { BandsService } from './bands.service';
import { Band } from './entities/band.entity';
import { CreateBandInput } from './dto/create-band.input';
import { UpdateBandInput } from './dto/update-band.input';

@Resolver(() => Band)
export class BandsResolver {
  constructor(private readonly bandsService: BandsService, private readonly genresService: GenresService) {}

  @Mutation(() => Band)
  createBand(@Args('createBandInput') createBandInput: CreateBandInput, @Context('req') req: any) {
    const token = req.headers.authorization;
    return this.bandsService.create(createBandInput, token);
  }

  @Query(() => [Band], { name: 'bands', nullable: 'itemsAndList' })
  findAll(@Args('pagingBandInput', {nullable: true}) pagingBandInput?: PagingBandInput) {
    return this.bandsService.findAll(pagingBandInput);
  }

  @Query(() => Band, { name: 'band' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.bandsService.findOne(id);
  }

  @Mutation(() => Band)
  updateBand(@Args('updateBandInput') updateBandInput: UpdateBandInput, @Context('req') req: any) {
    const token = req.headers.authorization;
    return this.bandsService.update(updateBandInput._id, updateBandInput, token);
  }

  @Mutation(() => Band, {nullable: true})
  removeBand(@Args('id', { type: () => String }) id: string, @Context('req') req: any) {
    const token = req.headers.authorization;
    return this.bandsService.remove(id, token);
  }

  @ResolveField('genres', () => [Genre])
  getTracks(@Parent() band: Band) {
    const { genresIds } = band;

    const promises = Promise.all(
      genresIds.map((id) => {
        return this.genresService.findOne(id);
      }),
    );

    return promises;
  }
}
