import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './useCases/orthography.useCase';
import { OrthographyDto } from './dtos/orthography.dto';
import OpenAI from 'openai';

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
}
