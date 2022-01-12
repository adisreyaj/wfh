import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@wfh/ui';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@wfh/store-front/service';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'wfh-address-modal',
  template: ` <div class="p-10">
    <header class="mb-6">
      <h1 class="font-medium text-lg">
        {{ this.dialogRef.data?.isEditMode ? 'Update' : 'Add New' }} Address
      </h1>
    </header>
    <form [formGroup]="this.addressForm" (ngSubmit)="this.createOrUpdate()">
      <div class="form-group">
        <label for="firstName">Apartment</label>
        <input class="w-full" type="text" id="firstName" formControlName="apartment" />
      </div>
      <div class="form-group">
        <label for="firstName">Street</label>
        <input class="w-full" type="text" id="firstName" formControlName="street" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label for="firstName">City</label>
          <input class="w-full" type="text" id="firstName" formControlName="city" />
        </div>
        <div class="form-group">
          <label for="firstName">State</label>
          <input class="w-full" type="text" id="firstName" formControlName="state" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label for="firstName">Country</label>
          <input class="w-full" type="text" id="firstName" formControlName="country" />
        </div>
        <div class="form-group">
          <label for="firstName">Zip Code</label>
          <input class="w-full" type="text" id="firstName" formControlName="zip" />
        </div>
      </div>
      <div class="form-group">
        <label for="firstName">Phone</label>
        <input class="w-full" type="tel" id="firstName" formControlName="phone" />
      </div>
      <footer class="flex items-center justify-between mt-10">
        <button wfh variant="neutral" type="button" (click)="this.dialogRef.close(false)">
          Close
        </button>
        <button wfh [disabled]="this.addressForm.invalid || (this.loading$ | async)" type="submit">
          Save
        </button>
      </footer>
    </form>
  </div>`,
})
export class AddressModalComponent {
  addressForm: FormGroup;
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  constructor(
    public readonly dialogRef: DialogRef,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toast: HotToastService
  ) {
    this.addressForm = this.fb.group({
      apartment: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
    });
    const address = this.dialogRef.data.address;
    if (address) {
      const { apartment, street, city, state, country, zip, phone } = address;
      this.addressForm.setValue({ apartment, street, city, state, country, zip, phone });
    }
  }

  createOrUpdate() {
    if (this.addressForm.valid) {
      if (this.dialogRef.data.isEditMode) {
        this.loadingSubject.next(true);
        this.userService
          .updatedAddress(this.dialogRef.data.address._id, this.addressForm.value)
          .pipe(
            tap(() => {
              this.loadingSubject.next(false);
            }),
            catchError(() => {
              this.loadingSubject.next(false);
              return EMPTY;
            })
          )
          .subscribe({
            next: () => {
              this.addressForm.reset();
              this.dialogRef.close(true);
              this.toast.success('Address updated successfully');
            },
            error: () => {
              this.toast.error('Failed to update address');
            },
          });
      } else {
        this.userService
          .addAddress(this.addressForm.value)
          .pipe(
            tap(() => {
              this.loadingSubject.next(false);
            }),
            catchError(() => {
              this.loadingSubject.next(false);
              return EMPTY;
            })
          )
          .subscribe({
            next: () => {
              this.addressForm.reset();
              this.dialogRef.close(true);
              this.toast.success('Address added successfully');
            },
            error: () => {
              this.toast.error('Failed to add address');
            },
          });
      }
    }
  }
}

@NgModule({
  declarations: [AddressModalComponent],
  exports: [AddressModalComponent],
  imports: [CommonModule, ButtonModule, ReactiveFormsModule, FormsModule],
})
export class AddressModalModule {}
