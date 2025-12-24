import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ example: 'Yurii', description: 'The user full name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: "The user's email. Will be used in account login",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'test1234',
    description: 'The password, that will be used in account login',
  })
  @IsNotEmpty()
  password: string;
}
