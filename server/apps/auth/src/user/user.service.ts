// vendor
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// cus
import { UserRepo } from './user.repo';
import { LoginInputDTO, LoginOutputDTO, SignUpDTO, UserDTO } from './dto/common.dto';
import { User } from '@app/database/models/user';
import { JwtService } from '@app/jwt';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepo, private jwtService: JwtService) {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async SaveUser(data: SignUpDTO): Promise<Boolean> {
        try {
            // id 중복 확인
            const targetUser = await this.userRepo.FindUserByID(data.id);
            if (targetUser) {
                return false;
            }
            // pw 암호화
            const bcryptPw = await bcrypt.hash(data.password, 10);

            const user: User = new User({
                id: data.id,
                pw: bcryptPw,
                name: data.name,
                email: data.email,
            });
            await user.save();
        } catch (err) {
            throw err;
        }
        return true;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async Login(data: LoginInputDTO): Promise<LoginOutputDTO> {
        let targetUser: User = null;

        try {
            targetUser = await this.userRepo.FindUserByID(data.id);
        } catch (err) {
            throw err;
        }

        if (targetUser === null) {
            return null;
        }

        const isMatch = await bcrypt.compare(data.password, targetUser.pw);
        if (!isMatch) {
            return null;
        }

        // Sequelize 모델 인스턴스가 나오기에 data만 추출
        const payload = targetUser.dataValues;
        delete payload.pw;
        return {
            access_token: await this.jwtService.createAccessToken(payload),
            refresh_token: await this.jwtService.createRefreshToken(payload),
        };
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async UpdateOtpEnabled(userIdx: number, otpEnabled: boolean): Promise<Boolean> {
        try {
            return await this.userRepo.UpdateUserOtpEnabled(userIdx, otpEnabled);
        } catch (err) {
            throw err;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async UpdateUser(userIdx: number, user: UserDTO): Promise<Boolean> {
        try {
            return await this.userRepo.UpdateUser(userIdx, user);
        } catch (err) {
            throw err;
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async RefreshAccessToken(decodedUser: User, refreshToken: string): Promise<String> {
        // 1. refreshToken validation
        try {
            this.jwtService.validateToken(refreshToken);
        } catch (err) {
            throw err;
        }
        try {
            // 2. find user
            const user = await this.userRepo.FindUserByIdx(decodedUser.user_idx);

            const payload = user.dataValues;
            delete payload.pw;

            const accessToken = await this.jwtService.createAccessToken(payload);
            return accessToken;
        } catch (err) {
            throw err;
        }
    }
}
