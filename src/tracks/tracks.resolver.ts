import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TracksService } from './tracks.service';
import { Track } from './entities/track.entity';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';

@Resolver(() => Track)
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Mutation(() => Track)
  createTrack(
    @Args('createTrackInput') createTrackInput: CreateTrackInput,
    @Context('req') req: any,
  ) {
    const token = req.headers.authorization;
    return this.tracksService.create(createTrackInput, token);
  }

  @Query(() => [Track], { name: 'tracks', nullable:'itemsAndList' })
  findAll() {
    return this.tracksService.findAll();
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
}
