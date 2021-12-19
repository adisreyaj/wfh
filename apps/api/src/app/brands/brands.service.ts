import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BrandsModel } from '../brands/brands.schema';
import { Model } from 'mongoose';
import { BrandDocument, BrandRequest } from '@wfh/api-interfaces';
import { catchError, from, map, of } from 'rxjs';
import { MONGO_ERROR } from '../core/config/mongo.error';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(BrandsModel.name)
    private readonly brandModel: Model<BrandDocument>
  ) {}

  getAll() {
    return from(this.brandModel.find({})).pipe(
      catchError((err) => {
        return of(new InternalServerErrorException(err));
      })
    );
  }

  get(id: string) {
    return from(this.brandModel.findById(id)).pipe(
      map((brand) => {
        if (!brand) {
          throw new NotFoundException();
        }
        return brand;
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          return of(err);
        }
        return of(new InternalServerErrorException(err));
      })
    );
  }

  create(brandReq: BrandRequest) {
    return from(this.brandModel.create(brandReq)).pipe(
      catchError((err) => {
        const exception = MONGO_ERROR('brand')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
    );
  }

  update(id: string, brandReq: Partial<BrandRequest>) {
    return from(this.brandModel.findByIdAndUpdate(id, brandReq, { new: true })).pipe(
      map((brand) => {
        if (!brand) {
          throw new NotFoundException();
        }
        return brand;
      }),
      catchError((err) => {
        const exception = MONGO_ERROR('brand')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
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
      catchError((err) => {
        const exception = MONGO_ERROR('brand')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
    );
  }
}
