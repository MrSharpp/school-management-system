import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtService } from 'src/shared/jwt.service';
import { AuthService } from './auth.service';
import { SignInCredentialsDto } from './dtos/signin-credentials.DTO';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private authServie: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() signinCredential: SignInCredentialsDto
  ): Promise<{ token: string }> {
    console.log(signinCredential);

    const user = await this.authServie.login({
      email: signinCredential.email,
    });

    // validation for password
    if (!user || user.password != signinCredential.password)
      throw new UnauthorizedException('Invalid Credentials');
    return { token: this.jwtService.encode(user) };
  }
}
