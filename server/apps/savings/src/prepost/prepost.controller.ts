import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrepostService } from './prepost.service';
import { CreatePrepostDto } from './dto/create-prepost.dto';
import { UpdatePrepostDto } from './dto/update-prepost.dto';

@Controller('prepost')
export class PrepostController {
  constructor(private readonly prepostService: PrepostService) {}

  @Post()
  create(@Body() createPrepostDto: CreatePrepostDto) {
    return this.prepostService.create(createPrepostDto);
  }

  @Get()
  findAll() {
    return this.prepostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prepostService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrepostDto: UpdatePrepostDto) {
    return this.prepostService.update(+id, updatePrepostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prepostService.remove(+id);
  }
}
