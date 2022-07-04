import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { v4 } from 'uuid';

import { PizzaToppings } from '../../constants';

class OrderDto {
  @ApiModelProperty({
    isArray: true,
    enum: [PizzaToppings],
    example: Object.keys(PizzaToppings),
  })
  @IsNotEmpty()
  @IsEnum(PizzaToppings)
  toppings: PizzaToppings[];
}

export class OrdersDto {
  @ApiModelProperty({ isArray: true, type: OrderDto })
  @IsNotEmpty()
  orders: OrderDto[];
}

export class OrderParamsDto {
  @ApiModelProperty({ example: v4() })
  @IsNotEmpty()
  @IsUUID('4')
  orderId: string;
}
