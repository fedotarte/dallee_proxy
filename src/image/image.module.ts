import { Module } from '@nestjs/common';
import { OpenaiModule } from 'src/openai/openai.module';
import { ImageGenController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  controllers: [ImageGenController],
  providers: [ImageService],
  imports: [OpenaiModule],
})
export class ImageModule {}
