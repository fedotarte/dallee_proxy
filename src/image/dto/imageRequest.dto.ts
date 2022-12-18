import { ApiProperty } from '@nestjs/swagger';

export class ImageRequestDto {
  @ApiProperty({
    description: 'prompt text',
    example: 'a cat with sunflower',
  })
  prompt: string;
}
