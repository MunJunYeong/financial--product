import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrepostModule } from './prepost/prepost.module';

@Module({
  imports: [PrepostModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
