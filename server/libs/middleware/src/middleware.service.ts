import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

// cus
import { JwtService } from '@app/jwt';
import { NextFunction } from 'express';

@Injectable()
export class MiddlewareService implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    // "Bearer TOKEN" 형식에서 토큰을 추출
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // 토큰 검증
      const payload = this.jwtService.validateToken(token);
      // 요청 객체에 사용자 정보를 첨부
      req['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
