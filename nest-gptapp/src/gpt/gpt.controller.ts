import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { GptService } from './gpt.service';

import { OrthographyDto } from './dtos/orthography.dto';

import { ProsConsDiscusserDto } from './dtos/prosConsDiscusser.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  async orthographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      // console.log(piece);

      res.write(piece);
    }

    res.end();
  }
}
