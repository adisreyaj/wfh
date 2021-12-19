import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from './schemas/products.schema';
import { Model } from 'mongoose';
import { ProductDocument, ProductRequest } from '@wfh/api-interfaces';
import { catchError, from, map, of } from 'rxjs';
import { MONGO_ERROR } from '../core/config/mongo.error';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>
  ) {}

  search() {
    return from(
      this.productModel.aggregate([
        {
          $search: {},
        },
      ])
    );
  }

  getAll() {
    return from(this.productModel.find({})).pipe(
      catchError((err) => {
        return of(new InternalServerErrorException(err));
      })
    );
  }

  get(id: string) {
    return from(this.productModel.findById(id)).pipe(
      map((product) => {
        if (!product) {
          throw new NotFoundException();
        }
        return product;
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          return of(err);
        }
        return of(new InternalServerErrorException(err));
      })
    );
  }

  create(productReq: ProductRequest) {
    return from(this.productModel.create(productReq)).pipe(
      catchError((err) => {
        const exception = MONGO_ERROR('product')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
    );
  }

  update(id: string, productReq: Partial<ProductRequest>) {
    return from(this.productModel.findByIdAndUpdate(id, productReq, { new: true })).pipe(
      map((product) => {
        if (!product) {
          throw new NotFoundException();
        }
        return product;
      }),
      catchError((err) => {
        const exception = MONGO_ERROR('product')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
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
      catchError((err) => {
        const exception = MONGO_ERROR('product')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
    );
  }
}
