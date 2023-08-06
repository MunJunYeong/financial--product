// vendor
import { Injectable } from '@nestjs/common';

// cus
import { ProductDTO } from './dto/common.dto';
import { UserProductsRepo } from './user_products.repo';
import { UserRepo } from 'apps/auth/src/user/user.repo';
import { User } from '@app/database/models/user';
import { Product } from '@app/database/models/product';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
@Injectable()
export class UserProductsService {
  constructor(private readonly prodRepo: UserProductsRepo, private readonly userRepo: UserRepo) {}

  // save user's prodcut
  async SaveUserProduct(userIdx: number, productDTO: ProductDTO) {
    try {
      // 1. find user
      const user = await this.userRepo.FindUserByIdx(userIdx);
      // 2. create product
      const product: Product = new Product({
        name: productDTO.name,
        start_date: productDTO.start_date,
        finish_date: productDTO.finish_date,
        period: productDTO.period,
        rate: productDTO.rate,
        monthly_payment: productDTO.monthly_payment,
        total_interest: productDTO.total_interest,
        is_simple: productDTO.is_simple,
        user_idx: userIdx,
        user: user,
      });
      product.save();
    } catch (err) {
      throw err;
    }
    return true;
  }

  // get user's all product
  async GetUserProducts(userIdx: number): Promise<Product[]> {
    try {
      // 1. find user
      const user = await this.userRepo.FindUserByIdxIncProd(userIdx);
      return user.products;
    } catch (err) {
      throw err;
    }
  }
}
