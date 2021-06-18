import { ApiProperty } from '@nestjs/swagger'

export class RegisterAndLoginResponse {
  @ApiProperty()
  user: string

  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string
}

export class AuthResponse {
  @ApiProperty()
  user: string
}
