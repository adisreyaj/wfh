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

  getAll(filters: any, searchTerm = '') {
    if (isEmpty(filters) && isEmpty(searchTerm)) {
      return from(this.productModel.find({})).pipe(handleError('product'));
    }
    const pipeline = [];
    if (!isEmpty(filters)) {
      let minShouldMatch = 0;
      const searchPipelineItem: Record<string, any> = {
        $search: {
          compound: {
            filter: [],
            must: [],
            should: [],
            minimumShouldMatch: 0,
          },
        },
      };

      if (!isEmpty(searchTerm)) {
        searchPipelineItem.$search.compound['must'].push({
          text: {
            query: searchTerm,
            path: ['name', 'description'],
          },
        });
      }
      if (!isEmpty(filters.brands)) {
        minShouldMatch += 1;
        searchPipelineItem.$search.compound['should'].push(
          ...filters.brands.split(',').map((brand) => ({
            equals: {
              path: 'brand',
              value: new Types.ObjectId(brand),
            },
          }))
        );
      }
      if (!isEmpty(filters.categories)) {
        minShouldMatch += 1;
        searchPipelineItem.$search.compound['should'].push(
          ...filters.categories.split(',').map((category) => ({
            equals: {
              path: 'category',
              value: new Types.ObjectId(category),
            },
          }))
        );
      }

      if (!isEmpty(filters.colors)) {
        minShouldMatch += 1;
        searchPipelineItem.$search.compound['should'].push(
          ...filters.colors.split(',').map((color) => ({
            text: {
              path: 'colors',
              query: color,
            },
          }))
        );
      }
      let priceFilter = {};
      if (filters?.price_from && filters?.price_to) {
        priceFilter = {
          range: {
            path: 'price',
            gte: +filters.price_from,
            lte: +filters.price_to,
          },
        };
      } else {
        if (filters?.price_from) {
          priceFilter = {
            range: {
              path: 'price',
              gte: +filters.price_from,
            },
          };
        }
        if (filters?.price_to) {
          priceFilter = {
            range: {
              path: 'price',
              lte: +filters.price_to,
            },
          };
        }
      }

      if (!isEmpty(priceFilter)) {
        searchPipelineItem.$search.compound.filter.push(priceFilter);
      }
      searchPipelineItem.$search.compound.minimumShouldMatch = minShouldMatch;
      pipeline.push(searchPipelineItem);
    }

    console.dir(pipeline, { depth: null });
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
