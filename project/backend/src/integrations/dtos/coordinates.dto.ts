import { ApiProperty } from '@nestjs/swagger';

export class CoordinatesDto {
  @ApiProperty({
    example: 50.45,
    description: 'Latitude of the location(shows where is the north/south)',
  })
  lat: string;

  @ApiProperty({
    example: 30.5241,
    description: 'Longitude of the location (shows where is the east/west)',
  })
  lon: string;
}
