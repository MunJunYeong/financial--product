import { Controller, Get, Param, Post } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { ApiOperation, ApiTags, ApiResponse, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductWithOptionDTO } from './dto/service.dto';
// swagger에 tag를 생성해줌
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('/prod')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  // TODO: scheduling에서 매번 상품 업데이트

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Savings (적금) 관련 API

  // Save savings - 상품 저장
  @ApiTags('Savings')
  @ApiOperation({ summary: 'save savings product' })
  @ApiOkResponse({
    description: '적금 저장 성공 유무',
    schema: {
      example: { success: true },
    },
  })
  @Post('/savings')
  async postSavings() {
    return await this.savingsService.SaveSavings();
  }

  // Get best savings product - 금리가 가장 높은 상품
  @ApiTags('Savings')
  @ApiOperation({ summary: 'get savings product' })
  @ApiOkResponse({
    description: '적금 정보(금리가 가장 높은 상품 list)',
    type: ProductWithOptionDTO,
    isArray: true,
  })
  @Get('savings/best')
  async getBestSavings() {
    return await this.savingsService.GetBestSavings();
  }

  // Get best savings product - 금리가 가장 높은 상품
  @ApiTags('Savings')
  @ApiOperation({ summary: 'get savings product' })
  @ApiOkResponse({
    description: '해당 적금 자세한 정보',
    type: ProductWithOptionDTO,
    isArray: true,
  })
  @Get('savings/:fin_prdt_cd')
  async getDetailSavings(@Param('fin_prdt_cd') prodCode: string) {
    return await this.savingsService.GetDetailSavings(prodCode);
  }

  // Get all savings product - 모든 적금 상품 / 해당 API는 front에서 호출하지 않고 있음.
  @ApiTags('Savings')
  @ApiOperation({ summary: 'get savings product' })
  @ApiOkResponse({
    description: '적금 정보',
    type: ProductWithOptionDTO,
    isArray: true,
  })
  @Get('savings')
  async getSavings() {
    return await this.savingsService.GetSavings();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Installment (예금) 관련 API

  // Save installment - 상품 저장
  @ApiTags('Installment')
  @ApiOperation({ summary: 'save installment product' })
  @ApiOkResponse({
    description: '정기 예금저장 성공 유무',
    schema: {
      example: { success: true },
    },
  })
  @Post('installment')
  async postInstallments() {
    return await this.savingsService.SaveInstallments();
  }

  // Get best installment product - 금리가 가장 높은 상품
  @ApiTags('Installment')
  @ApiOperation({ summary: 'get installment product' })
  @ApiOkResponse({
    description: '예금 정보(금리가 가장 높은 상품 list)',
    type: ProductWithOptionDTO,
    isArray: true,
  })
  @Get('installment/best')
  async getBestInstallments() {
    return await this.savingsService.GetBestInstallments();
  }

  // Get best savings product - 금리가 가장 높은 상품
  @ApiTags('Installment')
  @ApiOperation({ summary: 'get detail installment product' })
  @ApiOkResponse({
    description: '해당 예금 자세한 정보',
    type: ProductWithOptionDTO,
    isArray: true,
  })
  @Get('installment/:fin_prdt_cd')
  async getDetailInstallments(@Param('fin_prdt_cd') prodCode: string) {
    return await this.savingsService.GetDetailInstallments(prodCode);
  }

  // Get all installment product - 모든 예금 상품
  @ApiTags('Installment')
  @ApiOperation({ summary: 'get installment product' })
  @ApiOkResponse({
    description: '정기 예금 정보',
    type: ProductWithOptionDTO,
    isArray: true,
  })
  @Get('installment')
  async findInstallmentSavings() {
    return await this.savingsService.GetInstallment();
  }
}
