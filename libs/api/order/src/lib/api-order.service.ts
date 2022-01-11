import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrderModel } from './api-order.schema';
import { OrderDocument, OrderRequest } from '@wfh/api-interfaces';
import { from, switchMap } from 'rxjs';
import { handleError } from '@wfh/api/util';

@Injectable()
export class ApiOrderService {
  constructor(@InjectModel(OrderModel.name) private readonly ordersModel: Model<OrderDocument>) {}

  searchOrders(userId: string, query: string) {
    return from(
      this.ordersModel.aggregate([
        {
          $search: {
            compound: {
              filter: [
                {
                  equals: {
                    path: 'user',
                    value: new Types.ObjectId(userId),
                  },
                },
                {
                  text: {
                    query: query,
                    path: ['products.name', 'products.description'],
                  },
                },
              ],
            },
          },
        },
      ])
    ).pipe(
      switchMap((orders) => {
        return from(
          this.ordersModel.populate(orders, {
            path: 'products.productId',
            select: 'name description images category',
          })
        );
      }),
      handleError('orders', 'searchOrders')
    );
  }

  getOrdersByUserId(userId: string) {
    return from(this.ordersModel.find({ user: userId }).populate('products.productId')).pipe(
      handleError('orders')
    );
  }

  newOrder(userId: string, order: OrderRequest) {
    return from(
      this.ordersModel.create({
        user: userId,
        ...order,
        products: order.products.map((product) => ({
          productId: product.id,
          description: product.description,
          price: product.price,
          name: product.name,
        })),
        total: order.products.reduce((acc, cur) => acc + cur.price, 0),
        delivery: {
          status: 'RECEIVED',
          expectedDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
        },
      })
    ).pipe(handleError('order'));
  }
}
