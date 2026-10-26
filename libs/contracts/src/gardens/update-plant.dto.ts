import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './create-plant.dto';
/**
 * author: chatGPT
 */
export class UpdatePlantDto extends PartialType(CreatePlantDto) {
    id: number
    name?: string;
}
