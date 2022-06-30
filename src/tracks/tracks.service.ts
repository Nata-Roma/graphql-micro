import { PagingTrackInput } from './dto/paging-track.input';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';

@Injectable()
export class TracksService {
  private client = null;
  constructor(config: ConfigService) {
    this.client = axios.create({ baseURL: config.get('TRACK_URL') });
  }

  async create(createTrackInput: CreateTrackInput, token: string) {

    const headers = {
      Authorization: token,
    };

    const data = {
      ...createTrackInput,
    };

    const resp = await this.client.post('', data, {
      headers,
    });
    return resp.data;
  }

  async findAll(pagingTrackInput: PagingTrackInput) {
    const { limit, offset } = pagingTrackInput;
    const resp = await this.client.get(`?limit=${limit}&offset=${offset}`);
    return resp.data.items;
  }

  async findOne(id: string) {
    const resp = await this.client.get(`/${id}`);
    return resp.data;
  }

  async update(id: string, updateTrackInput: UpdateTrackInput, token: string) {
    const headers = {
      Authorization: token,
    };

    const data = {
      ...updateTrackInput,
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
