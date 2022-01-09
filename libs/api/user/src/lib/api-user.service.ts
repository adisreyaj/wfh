import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './api-user.schema';
import { Model } from 'mongoose';
import { from, Observable, of, switchMap, throwError } from 'rxjs';
import { UserAuth0Request, UserDocument } from '@wfh/api-interfaces';
import { handleError } from '@wfh/api/util';

@Injectable()
export class ApiUserService {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}

  createUserAuth0(user: UserAuth0Request): Observable<UserDocument> {
    console.info(`Creating user: ${JSON.stringify(user)}`);
    return from(this.userModel.create(user)).pipe(handleError('user'));
  }

  getUserByEmail(email: string) {
    console.log('Getting user with email: ' + email);
    return from(this.userModel.findOne({ email })).pipe(
      switchMap((user) =>
        user ? of(user) : throwError(() => new NotFoundException('User not found'))
      ),
      handleError('user')
    );
  }
}
