import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import axios from 'axios';

@Injectable()
export class ArtistsService {
  private client = null;
  constructor(config: ConfigService) {
    this.client = axios.create({ baseURL: config.get('ARTIST_URL') });
  }

  async create(createArtistInput: CreateArtistInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...createArtistInput,
    };

    const resp = await this.client.post('', data, {
      headers,
    });
    return resp.data;
  }

  async findAll() {
    const resp = await this.client.get();
    return resp.data.items;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);
    return resp.data;
  }

  async update(
    id: string,
    updateArtistInput: UpdateArtistInput,
    token: string,
  ) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...updateArtistInput,
    };

    const resp = await this.client.put(`/${id}`, data, {
      headers,
    });

    return resp.data;
  }

  async remove(id: string, token: string) {
    const headers = {
      Authorization: token,
    };
    const resp = await this.client.delete(`/${id}`, {headers});
    if(resp.data.acknowledged && resp.data.deletedCount === 1) {
      return {_id: id}
    }
    return resp;
  }
}
