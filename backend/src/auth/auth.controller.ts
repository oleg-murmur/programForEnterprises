import { Body, Controller, Get, HttpCode, HttpStatus, Request,Post, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './constants';

// export const AdminOnly = () => SetMetadata(IS_ADMIN_KEY, true);
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: any) {
      console.log(signInDto)
      return this.authService.signIn(signInDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
    
}
