import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BrandDocument, BrandRequest } from '@wfh/api-interfaces';
import { handleError } from '@wfh/api/util';
import { from, map } from 'rxjs';

import { BrandsModel } from './api-brand.schema';

@Injectable()
export class ApiBrandService {
  constructor(
    @InjectModel(BrandsModel.name)
    private readonly brandModel: Model<BrandDocument>
  ) {}

  autocomplete(searchTerm: string) {
    return from(
      this.brandModel.aggregate([
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
    ).pipe(handleError('category'));
  }

  getAll() {
    return from(this.brandModel.find({})).pipe(handleError('brand'));
  }

  get(id: string) {
    return from(this.brandModel.findById(id)).pipe(
      map((brand) => {
        if (!brand) {
          throw new NotFoundException();
        }
        return brand;
      }),
      handleError('brand')
    );
  }

  create(brandReq: BrandRequest) {
    return from(this.brandModel.create(brandReq)).pipe(handleError('brand'));
  }

  update(id: string, brandReq: Partial<BrandRequest>) {
    return from(this.brandModel.findByIdAndUpdate(id, brandReq, { new: true })).pipe(
      map((brand) => {
        if (!brand) {
          throw new NotFoundException();
        }
        return brand;
      }),
      handleError('brand')
    );
  }

  delete(id: string) {
    return from(this.brandModel.findByIdAndDelete(id)).pipe(
      map((brand) => {
        if (!brand) {
          throw new NotFoundException();
        }
        return brand;
      }),
      handleError('brand')
    );
  }
}
