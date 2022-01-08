import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { from, map } from 'rxjs';

import { ProductDocument, ProductRequest } from '@wfh/api-interfaces';
import { handleError } from '@wfh/api/util';

import { ProductModel } from './schemas/products.schema';
import { isEmpty } from 'lodash';

@Injectable()
export class ApiProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  autocomplete(searchTerm: string) {
    return from(
      this.productModel.aggregate([
        {
          $search: {
            autocomplete: {
              query: searchTerm,
              path: 'name',
            },
          },
        },
        {
          $project: {
            name: 1,
          },
        },
      ])
    ).pipe(handleError('product'));
  }

  getAll(filters: any) {
    if (isEmpty(filters)) {
      return from(this.productModel.find({})).pipe(handleError('product'));
    }
    const pipeline = [];
    if (filters?.brands) {
      pipeline.push({
        $match: {
          brand: {
            $in: filters.brands.split(',').map((id) => new Types.ObjectId(id)),
          },
        },
      });
    }
    if (filters?.colors) {
      pipeline.push({
        $match: {
          colors: {
            $in: filters.colors.split(','),
          },
        },
      });
    }
    if (filters?.price_from && filters?.price_to) {
      pipeline.push({
        $match: {
          price: {
            $gte: +filters.price_from,
            $lte: +filters.price_to,
          },
        },
      });
    } else {
      if (filters?.price_from) {
        pipeline.push({
          $match: {
            price: {
              $gte: +filters.price_from,
            },
          },
        });
      }
      if (filters?.price_to) {
        pipeline.push({
          $match: {
            price: {
              $lte: +filters.price_to,
            },
          },
        });
      }
    }
    return from(this.productModel.aggregate(pipeline)).pipe(handleError('product'));
  }

  get(id: string) {
    return from(this.productModel.findById(id)).pipe(
      map((product) => {
        if (!product) {
          throw new NotFoundException();
        }
        return product;
      }),
      handleError('product')
    );
  }

  create(productReq: ProductRequest) {
    return from(this.productModel.create(productReq)).pipe(handleError('product'));
  }

  update(id: string, productReq: Partial<ProductRequest>) {
    return from(this.productModel.findByIdAndUpdate(id, productReq, { new: true })).pipe(
      map((product) => {
        if (!product) {
          throw new NotFoundException();
        }
        return product;
      }),
      handleError('product')
    );
  }

  delete(id: string) {
    return from(this.productModel.findByIdAndDelete(id)).pipe(
      map((product) => {
        if (!product) {
          throw new NotFoundException();
        }
        return product;
      }),
      handleError('product')
    );
  }
}
