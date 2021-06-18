import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { RegisterAndLoginResponse, AuthResponse } from './interface'
import { ForgotPasswordDto, ForgotPasswordResponse, LoginDto, RegisterDto, ResetPasswordDto, FiliterDto } from './dto'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(200)
  @ApiOkResponse({
    type: RegisterAndLoginResponse,
    description: 'Register an account successful'
  })
  register(@Body() payload: RegisterDto): Promise<any> {
    return this.authService.register(payload)
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({
    type: RegisterAndLoginResponse,
    description: 'Login successful'
  })
  login(@Body() payload: LoginDto): Promise<any> {
    return this.authService.login(payload)
  }
}
