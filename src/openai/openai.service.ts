import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  configuration: Configuration;
  openai: OpenAIApi;
  key: string;
  constructor() {
    console.log('OpenaiService constructor');
    this.key = process.env.OPENAI_API_KEY ?? '';
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }
}
