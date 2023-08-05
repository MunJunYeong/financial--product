// vendor
import { IsBoolean, IsNumber, IsString } from "class-validator";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class ProductDTO {
    @IsString()
    name: string

    @IsString()
    start_date: string;

    @IsString()
    finish_date: string;

    @IsString()
    period: string;

    @IsNumber()
    rate: number;

    @IsString()
    monthly_payment: string;

    @IsString()
    total_interest: string;

    @IsBoolean()
    is_simple: boolean;
}