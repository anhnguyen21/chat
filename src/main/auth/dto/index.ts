import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatar: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  password: string
}
