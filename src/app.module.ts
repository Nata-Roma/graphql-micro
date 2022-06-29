import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { BandsModule } from './bands/bands.module';
import { GenresModule } from './genres/genres.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      debug: false,
      context: (({ req }) => {
        return { request: req }
     }),
    }),
    UsersModule,
    ArtistsModule,
    BandsModule,
    GenresModule,
    AlbumsModule,
    TracksModule,
    FavouritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
