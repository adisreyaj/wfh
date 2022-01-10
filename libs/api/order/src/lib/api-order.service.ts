import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderModel } from './api-order.schema';
import { OrderDocument, OrderRequest } from '@wfh/api-interfaces';
import { from } from 'rxjs';
import { handleError } from '@wfh/api/util';

@Injectable()
export class ApiOrderService {
  constructor(@InjectModel(OrderModel.name) private readonly ordersModel: Model<OrderDocument>) {}

  getOrdersByUserId(userId: string) {
    return from(this.ordersModel.find({ user: userId })).pipe(handleError('orders'));
  }

  newOrder(userId: string, order: OrderRequest) {
    return from(
      this.ordersModel.create({
        user: userId,
        ...order,
        delivery: {
          status: 'RECEIVED',
          expectedDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
        },
      })
    ).pipe(handleError('order'));
  }
}
