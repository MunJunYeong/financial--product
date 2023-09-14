import { Module } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';
import { JwtAuthModule } from '@app/jwt';

@Module({
    imports: [JwtAuthModule],
    providers: [MiddlewareService],
    exports: [MiddlewareService],
})
export class MiddlewareModule {}
