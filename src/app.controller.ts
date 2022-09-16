import { Controller, Post, Body, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { AppDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  buildTx(@Body() body: AppDto) {
    return this.appService.buildTx(body);
  }

  @Get()
  pong() {
    return 'Our official website: <a href="https://canoe.finance" target="_blank" rel="nofollow noopener noreferrer">https://canoe.finance</a>';
  }
}
