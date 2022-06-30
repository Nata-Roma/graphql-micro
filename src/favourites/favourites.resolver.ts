import { Genre } from './../genres/entities/genre.entity';
import { BandsService } from './../bands/bands.service';
import { GenresService } from './../genres/genres.service';
import { ArtistsService } from './../artists/artists.service';
import { RemoveFromFavouriteInput } from './dto/remove-from-favourites.dto';
import { AddFavouriteInput } from './dto/add-favourite.input';
import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { FavouritesService } from './favourites.service';
import { Favourite } from './entities/favourite.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { Track } from 'src/tracks/entities/track.entity';
import { Band } from 'src/bands/entities/band.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Resolver(() => Favourite)
export class FavouritesResolver {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
    private readonly bandsService: BandsService,
    private readonly tracksService: TracksService,
  ) {}

  @Mutation(() => Favourite)
  addToFavourites(
    @Args('addFavouriteInput')
    addFavouriteInput: AddFavouriteInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.favouritesService.add(addFavouriteInput, token);
  }

  @Query(() => Favourite, { name: 'favourites', nullable: true })
  findAll(@Context('req') req: any) {
    const token = req.headers.authorization;
    return this.favouritesService.findAll(token);
  }

  @Mutation(() => Favourite)
  removeFromFavourites(
    @Args('removeFromFavouriteInput')
    removeFromFavouriteInput: RemoveFromFavouriteInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.favouritesService.removeFromFavourites(
      removeFromFavouriteInput,
      token,
    );
  }

  @Mutation(() => Favourite)
  removeFavourite(
    @Args('id', { type: () => String }) id: string,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.favouritesService.remove(id, token);
  }

  @ResolveField('genres', () => [Genre])
  getGenres(@Parent() favorite: Favourite) {
    const { genresIds } = favorite;

    const promises = Promise.all(
      genresIds.map((id) => {
        return this.genresService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('tracks', () => [Track])
  getTracks(@Parent() favorite: Favourite) {
    const { tracksIds } = favorite;

    const promises = Promise.all(
      tracksIds.map((id) => {
        return this.tracksService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('bands', () => [Band])
  getBands(@Parent() favorite: Favourite) {
    const { bandsIds } = favorite;

    const promises = Promise.all(
      bandsIds.map((id) => {
        return this.bandsService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('artists', () => [Artist])
  getArtists(@Parent() favorite: Favourite) {
    const { artistsIds } = favorite;

    const promises = Promise.all(
      artistsIds.map((id) => {
        return this.artistsService.findOne(id);
      }),
    );

    return promises;
  }
}
