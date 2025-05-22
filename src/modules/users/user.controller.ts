import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { createUserDTO, loginDTO } from './dto/user.dto';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @ApiConsumes('application/json')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async create(
    @Body() dto: createUserDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.userService.create(dto, req.user);
    return res.status(result.code).send(result);
  }
  @Put('login')
  @ApiConsumes('application/json')
  async login(@Body() body: loginDTO, @Res() res: Response) {
    const result = await this.userService.login(body);
    return res.status(result.code).send(result);
  }
}
