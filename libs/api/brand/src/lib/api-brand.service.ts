import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BrandsModel } from './api-brand.schema';
import { Model } from 'mongoose';
import { BrandDocument, BrandRequest } from '@wfh/api-interfaces';
import { from, map } from 'rxjs';
import { handleError } from '@wfh/api/util';

@Injectable()
export class ApiBrandService {
  constructor(
    @InjectModel(BrandsModel.name)
    private readonly brandModel: Model<BrandDocument>
  ) {}

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
