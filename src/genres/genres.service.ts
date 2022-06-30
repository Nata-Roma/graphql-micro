import { PagingGenreInput } from './dto/paging-genre.input';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Injectable()
export class GenresService {
  private client = null;
  constructor(config: ConfigService) {
    this.client = axios.create({ baseURL: config.get('GENRE_URL') });
  }

  async create(createGenreInput: CreateGenreInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...createGenreInput,
    };
    const resp = await this.client.post('', data, {
      headers,
    });
    
    return resp.data;
  }

  async findAll(pagingGenreInput: PagingGenreInput) {
    const { limit, offset } = pagingGenreInput;
    const resp = await this.client.get(`?limit=${limit}&offset=${offset}`);
    return resp.data.items;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);
    return resp.data;
  }

  async update(id: string, updateGenreInput: UpdateGenreInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...updateGenreInput,
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
    const resp = await this.client.delete(`/${id}`, { headers });
    if (resp.data.acknowledged && resp.data.deletedCount === 1) {
      return { _id: id };
    }
    return resp;
  }
}
