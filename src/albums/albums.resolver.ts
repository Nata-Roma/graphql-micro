import { Track } from './../tracks/entities/track.entity';
import { Genre } from './../genres/entities/genre.entity';
import { TracksService } from './../tracks/tracks.service';
import { GenresService } from './../genres/genres.service';
import { BandsService } from './../bands/bands.service';
import { Band } from 'src/bands/entities/band.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistsService } from './../artists/artists.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly bandService: BandsService,
    private readonly genresService: GenresService,
    private readonly tracksService: TracksService,
  ) {}

  @Mutation(() => Album)
  createAlbum(
    @Args('createAlbumInput') createAlbumInput: CreateAlbumInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.albumsService.create(createAlbumInput, token);
  }

  @Query(() => [Album], { name: 'albums', nullable: 'itemsAndList' })
  findAll() {
    return this.albumsService.findAll();
  }

  @Query(() => Album, { name: 'album' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.albumsService.findOne(id);
  }

  @Mutation(() => Album)
  updateAlbum(
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.albumsService.update(
      updateAlbumInput._id,
      updateAlbumInput,
      token,
    );
  }

  @Mutation(() => Album)
  removeAlbum(
    @Args('id', { type: () => String }) id: string,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.albumsService.remove(id, token);
  }

  @ResolveField('artists', () => [Artist])
  getArtists(@Parent() album: Album) {
    const { artistsIds } = album;

    const promises = Promise.all(
      artistsIds.map((id) => {
        return this.artistsService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('bands', () => [Band])
  getBands(@Parent() album: Album) {
    const { bandsIds } = album;

    const promises = Promise.all(
      bandsIds.map((id) => {
        return this.bandService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('genres', () => [Genre])
  getGenres(@Parent() album: Album) {
    const { genresIds } = album;

    const promises = Promise.all(
      genresIds.map((id) => {
        return this.genresService.findOne(id);
      }),
    );

    return promises;
  }

  @ResolveField('tracks', () => [Track])
  getTracks(@Parent() album: Album) {
    const { trackIds } = album;

    const promises = Promise.all(
      trackIds.map((id) => {
        return this.tracksService.findOne(id);
      }),
    );

    return promises;
  }
}
