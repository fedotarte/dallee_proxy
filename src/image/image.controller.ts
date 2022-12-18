import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ImageRequestDto } from './dto/imageRequest.dto';
import { ImageResponseDto } from './dto/imageResponse.dto';
import { ImageService } from './image.service';

@Controller('images')
@ApiTags('images')
export class ImageGenController {
  constructor(private readonly imageService: ImageService) {}
  @Post('create')
  @ApiCreatedResponse({ type: ImageResponseDto })
  async generate(@Body() imageRequestDto: ImageRequestDto) {
    try {
      const imageUrl = await this.imageService.generateImage(
        imageRequestDto?.prompt,
      );
      return imageUrl;
    } catch (imageGenerationError) {
      console.error(imageGenerationError);
      throw new InternalServerErrorException('problem with file generation');
    }
  }
}
