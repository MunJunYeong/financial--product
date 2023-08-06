// vendor
import { IsBoolean, IsNumber, IsString } from 'class-validator';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class ProductDTO {
  @IsString()
  name: string;

  @IsString()
  start_date: string;

  @IsString()
  finish_date: string;

  @IsNumber()
  period: number;

  @IsNumber()
  rate: number;

  @IsNumber()
  monthly_payment: number;

  @IsNumber()
  total_interest: number;

  @IsString()
  type: string;

  @IsBoolean()
  is_simple: boolean;
}
