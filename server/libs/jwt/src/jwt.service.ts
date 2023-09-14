import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
    constructor(private readonly jwtService: NestJwtService) {}

    async createAccessToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload, { expiresIn: '4h' });
    }

    async createRefreshToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload, { expiresIn: '14d' });
    }

    // JWT 토큰 검증
    async validateToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        } catch (err) {
            // TODO: log 추가
            throw err;
        }
    }
}
