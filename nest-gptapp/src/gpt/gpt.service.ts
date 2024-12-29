import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { OrthographyDto } from './dtos/orthography.dto';
import { orthographyCheckUseCase } from './useCases/orthography.useCase';

import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';
import { prosConsDicusserUseCase } from './useCases/prosConsDiscusser.useCase';
import { prosConsDicusserStreamUseCase } from './useCases/prosConsDiscusserStream.useCase';

import { TranslateDto } from './dtos/translate.dto';
import { translateUseCase } from './useCases/translate.useCase';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // solo va a llamar casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      propmt: orthographyDto.prompt,
    });
  }

  async prosConsDicusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openai, { prompt });
  }

  async prosConsDicusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openai, { prompt });
  }

  async translateDto({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }
}
