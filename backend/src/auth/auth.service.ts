import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(
    email: string,
    password: string,
  ) {
    const existingUser =
      await this.userModel.findOne({ email });

    if (existingUser) {
      throw new UnauthorizedException(
        'Email đã tồn tại',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10,
    );

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    return {
      id: user._id.toString(),
      email: user.email,
    };
  }

  async login(
    email: string,
    password: string,
  ) {
    const user =
      await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(
        'Email hoặc password không đúng',
      );
    }

    const passwordValid =
      await bcrypt.compare(
        password,
        user.password,
      );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Email hoặc password không đúng',
      );
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const accessToken =
      await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }
}