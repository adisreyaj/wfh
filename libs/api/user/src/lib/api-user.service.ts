import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './api-user.schema';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { UserAuth0Request, UserDocument } from '@wfh/api-interfaces';
import { handleError } from '@wfh/api/util';

@Injectable()
export class ApiUserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}

  createUserAuth0(user: UserAuth0Request): Observable<UserDocument> {
    return from(this.userModel.create(user)).pipe(handleError('user'));
  }
}
