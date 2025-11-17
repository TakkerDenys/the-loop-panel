import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTFiN2VmZGZmZjI0ODRmNTg3YmVkMzgiLCJpYXQiOjE3NjM0MDk2NjEsImV4cCI6MTc2MzQxMDU2MX0.Dc-DwYE6HuSHNm4wnQSzigPE6YB0H0aMrUUd1Xx-JdA',
    description: 'The access token to make action in behalf of logined user',
  })
  jwt: string;
}
