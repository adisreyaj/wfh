import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDocument, AddressRequest } from '@wfh/api-interfaces';
import { AddressModel } from './api-address.schema';
import { from, Observable } from 'rxjs';
import { handleError } from '@wfh/api/util';

@Injectable()
export class ApiAddressService {
  constructor(
    @InjectModel(AddressModel.name) private readonly addressModel: Model<AddressDocument>
  ) {}

  add(address: AddressRequest): Observable<AddressDocument> {
    return from(this.addressModel.create(address)).pipe(handleError('address'));
  }

  update(id: string, address: AddressRequest) {
    return from(this.addressModel.findByIdAndUpdate(id, address, { new: true })).pipe(
      handleError('address')
    );
  }

  delete(id: string) {
    return from(this.addressModel.findByIdAndDelete(id)).pipe(handleError('address'));
  }
}
