import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { createUserDTO, loginDTO } from './dto/user.dto';
import { IResponse } from 'src/helpers/IResponseHandler';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(body: createUserDTO, user: any): Promise<IResponse> {
    if (user.role != 'admin')
      return { success: false, message: 'You are not authorized', code: 403 };
    const checkUser = await this.userRepository.getByField({
      email: body.email,
    });
    if (checkUser)
      return { code: 400, success: false, message: 'Email exits.' };
    const hashedPassword = hashSync(body.password, 10);
    body.password = hashedPassword;
    const saveUser = await this.userRepository.save(body);
    if (!saveUser)
      return { success: false, message: 'Something went wrong', code: 400 };
    return {
      code: 201,
      data: saveUser,
      success: true,
      message: 'User created successfully',
    };
  }
  async login(body: loginDTO): Promise<IResponse> {
    const checkUser = await this.userRepository.getByField({
      email: body.email,
      role: body.role,
    });
    if (!checkUser)
      return { code: 400, message: 'User not found', success: false };
    if (!compareSync(body.password, checkUser.password))
      return { code: 400, message: 'Invalid password', success: false };
    const payload = {
      id: checkUser.id as number,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      code: 200,
      message: 'LoggedIn successfully',
      success: true,
      data: { accessToken, checkUser },
    };
  }
}
