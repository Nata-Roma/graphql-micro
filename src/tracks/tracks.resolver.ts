import { PagingTrackInput } from './dto/paging-track.input';
import { Band } from './../bands/entities/band.entity';
import { ArtistsService } from './../artists/artists.service';
import { GenresService } from './../genres/genres.service';
import { BandsService } from './../bands/bands.service';
import { Genre } from './../genres/entities/genre.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Artist } from 'src/artists/entities/artist.entity';

@Resolver(() => Track)
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Mutation(() => Track)
  createTrack(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.tracksService.create(createTrackInput, token);
  }

  @Query(() => [Track], { name: 'tracks', nullable: 'itemsAndList' })
  findAll(@Args('pagingTrackInput', {nullable: true}) pagingTrackInput?: PagingTrackInput) {
    return this.tracksService.findAll(pagingTrackInput);
  }

  @Query(() => Track, { name: 'track' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tracksService.findOne(id);
  }

  @Mutation(() => Track)
  updateTrack(
    @Args('updateTrackInput') updateTrackInput: UpdateTrackInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.tracksService.update(
      updateTrackInput._id,
      updateTrackInput,
      token,
    );
  }

  @Mutation(() => Track)
  removeTrack(
    @Args('id', { type: () => String }) id: string,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.tracksService.remove(id, token);
  }

  @ResolveField('genres', () => [Genre], {nullable: 'itemsAndList'})
  getGenres(@Parent() track: Track) {
    const { genresIds } = track;

    const promises = Promise.all(
      genresIds.map((id) => {
        return this.genresService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('bands', () => [Band], {nullable: 'itemsAndList'})
  getBands(@Parent() track: Track) {
    const { bandsIds } = track;

    const promises = Promise.all(
      bandsIds.map((id) => {
        return this.bandsService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('artists', () => [Artist], {nullable: 'itemsAndList'})
  getArtists(@Parent() track: Track) {
    const { artistsIds } = track;

    const promises = Promise.all(
      artistsIds.map((id) => {
        return this.artistsService.findOne(id);
      }),
    );

    return promises;
  }
}
