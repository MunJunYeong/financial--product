import { Injectable, Logger } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async createAccessToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '3h' });
  }

  async createRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '14d' });
  }

  // JWT 토큰 검증
  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      // log 추가
      return null;
    }
  }
}
