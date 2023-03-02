import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateImageRequestSizeEnum } from 'openai';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class ImageService {
  private readonly imageServiceLogger: Logger;
  constructor(private openAiService: OpenaiService) {
    this.imageServiceLogger = new Logger(ImageService.name);
  }
  async generateImage(prompt: string) {
    this.imageServiceLogger.debug(this.openAiService.openai);
    this.imageServiceLogger.debug({ prompt });
    if (!prompt) {
      this.imageServiceLogger.error('no prompt in request body');
      return new BadRequestException('need a text to generate an image.');
    }
    try {
      const generatedImageResponse =
        await this.openAiService.openai.createImage({
          prompt,
          n: 1,
          size: CreateImageRequestSizeEnum._256x256,
        });
      this.imageServiceLogger.log('waiting for generatedImageResponse');
      if (
        [HttpStatus.CREATED, HttpStatus.OK].includes(
          generatedImageResponse.status,
        )
      ) {
        this.imageServiceLogger.log({
          generatedImageResponseData: generatedImageResponse.data,
        });
        return generatedImageResponse.data;
      } else {
        this.imageServiceLogger.error({
          imageStatus: generatedImageResponse.status,
        });
      }
    } catch (createImageError) {
      this.imageServiceLogger.error({
        createImageError,
      });
      throw new BadRequestException('problem with image creation');
    }
  }
}
