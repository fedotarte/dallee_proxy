import { ApiProperty } from '@nestjs/swagger';

export class ImageResponseDto {
  @ApiProperty({
    description: 'url of generated image',
    example:
      'https://cdn.openai.com/API/images/guides/image_generation_simple.webp',
  })
  url: string;
  @ApiProperty({
    description: 'id of generated image',
    format: 'uuid',
    example: '00a6fa25-df29-4701-9077-557932591766',
  })
  id: string;
}
