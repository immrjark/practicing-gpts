import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './useCases/orthography.useCase';
import { OrthographyDto } from './dtos/orthography.dto';

@Injectable()
export class GptService {
  // solo va a llamar casos de uso
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase({
      propmt: orthographyDto.prompt,
    });
  }
}
