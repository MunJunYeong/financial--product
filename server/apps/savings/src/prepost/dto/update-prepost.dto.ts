import { PartialType } from '@nestjs/mapped-types';
import { CreatePrepostDto } from './create-prepost.dto';

export class UpdatePrepostDto extends PartialType(CreatePrepostDto) {}
