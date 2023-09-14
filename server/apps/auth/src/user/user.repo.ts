// vendor
import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

// cus
import { User } from '@app/database/models/user';
import { Product } from '@app/database/models/product';
import { UserDTO } from './dto/common.dto';

@Injectable()
export class UserRepo {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    // find user by id
    async FindUserByID(id: string): Promise<User | null> {
        let res: User;
        try {
            res = await User.findOne({
                where: { id: id },
            });
        } catch (err) {
            throw err;
        }

        return res;
    }

    // find user by user_idx
    async FindUserByIdx(userIdx: number): Promise<User | null> {
        let res: User;
        try {
            res = await User.findOne({
                where: { user_idx: userIdx },
            });
        } catch (err) {
            throw err;
        }

        return res;
    }

    // find user by user_idx include product
    async FindUserByIdxIncProd(userIdx: number): Promise<User | null> {
        let res: User;
        try {
            res = await User.findOne({
                where: { user_idx: userIdx },
                include: [
                    {
                        model: Product,
                    },
                ],
            });
        } catch (err) {
            throw err;
        }

        return res;
    }

    async UpdateUserOtpEnabled(userIdx: number, otpEnabled: boolean): Promise<Boolean> {
        try {
            const updatedRows = await User.update(
                { otp_enabled: otpEnabled },
                {
                    where: { user_idx: userIdx },
                },
            );

            // updatedRows는 배열이며, 첫 번째 요소는 업데이트된 행의 수를 나타냅니다.
            return updatedRows[0] > 0;
        } catch (err) {
            throw err;
        }
    }

    async UpdateUser(userIdx: number, user: UserDTO): Promise<Boolean> {
        try {
            const updatedRows = await User.update(
                { name: user.name, email: user.email },
                {
                    where: { user_idx: userIdx },
                },
            );

            // updatedRows는 배열이며, 첫 번째 요소는 업데이트된 행의 수를 나타냅니다.
            return updatedRows[0] > 0;
        } catch (err) {
            throw err;
        }
    }
}
