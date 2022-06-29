import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { GenresService } from './genres.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Mutation(() => Genre)
  createGenre(
    @Args('createGenreInput') createGenreInput: CreateGenreInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.genresService.create(createGenreInput, token);
  }

  @Query(() => [Genre], { name: 'genres', nullable: 'itemsAndList' })
  findAll() {
    return this.genresService.findAll();
  }

  @Query(() => Genre, { name: 'genre' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.genresService.findOne(id);
  }

  @Mutation(() => Genre)
  updateGenre(
    @Args('updateGenreInput') updateGenreInput: UpdateGenreInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.genresService.update(
      updateGenreInput._id,
      updateGenreInput,
      token,
    );
  }

  @Mutation(() => Genre)
  removeGenre(
    @Args('id', { type: () => String }) id: string,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.genresService.remove(id, token);
  }
}
