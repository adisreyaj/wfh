import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument, CategoryRequest } from '@wfh/api-interfaces';
import { catchError, from, map, of } from 'rxjs';
import { MONGO_ERROR } from '../../../../../apps/api/src/app/core/config/mongo.error';
import { CategoryModel } from './api-category.schema';

@Injectable()
export class ApiCategoryService {
  constructor(
    @InjectModel(CategoryModel.name)
    private readonly categoryModel: Model<CategoryDocument>
  ) {}

  getAll() {
    return from(this.categoryModel.find({})).pipe(
      catchError((err) => {
        return of(new InternalServerErrorException(err));
      })
    );
  }

  get(id: string) {
    return from(this.categoryModel.findById(id)).pipe(
      map((category) => {
        if (!category) {
          throw new NotFoundException();
        }
        return category;
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          return of(err);
        }
        return of(new InternalServerErrorException(err));
      })
    );
  }

  create(categoryReq: CategoryRequest) {
    return from(this.categoryModel.create(categoryReq)).pipe(
      catchError((err) => {
        const exception = MONGO_ERROR('category')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
    );
  }

  update(id: string, categoryReq: Partial<CategoryRequest>) {
    return from(this.categoryModel.findByIdAndUpdate(id, categoryReq, { new: true })).pipe(
      map((category) => {
        if (!category) {
          throw new NotFoundException();
        }
        return category;
      }),
      catchError((err) => {
        const exception = MONGO_ERROR('category')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
    );
  }

  delete(id: string) {
    return from(this.categoryModel.findByIdAndDelete(id)).pipe(
      map((category) => {
        if (!category) {
          throw new NotFoundException();
        }
        return category;
      }),
      catchError((err) => {
        const exception = MONGO_ERROR('category')[err.code as string];
        return exception != null ? of(exception) : of(new InternalServerErrorException(err));
      })
    );
  }
}
