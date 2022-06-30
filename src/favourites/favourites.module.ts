import { GenresService } from './../genres/genres.service';
import { TracksService } from './../tracks/tracks.service';
import { BandsService } from './../bands/bands.service';
import { ArtistsService } from './../artists/artists.service';
import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesResolver } from './favourites.resolver';

@Module({
  providers: [
    FavouritesResolver,
    FavouritesService,
    ArtistsService,
    BandsService,
    TracksService,
    GenresService,
  ],
})
export class FavouritesModule {}
