import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { ButtonModule, USER_DETAILS, UserDetails } from '@wfh/ui';
import { filter, Observable, startWith, Subject, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DialogService } from '@ngneat/dialog';
import { AddressModalComponent } from '../../shared/components/address-modal.component';
import { UserService } from '@wfh/store-front/service';
import { AddressResponse } from '@wfh/api-interfaces';
import { IconModule } from '../../shared/modules/icon.module';
import { TippyModule } from '@ngneat/helipopper';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'wfh-profile',
  template: `
    <section *ngIf="user$ | async as user">
      <img [src]="user.avatar" class="rounded-md    " [alt]="user.firstName" />
    </section>
    <section class="mt-10">
      <form class="max-w-xl" [formGroup]="userForm">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input class="w-full" type="text" id="firstName" formControlName="firstName" />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input class="w-full" type="text" id="lastName" formControlName="lastName" />
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input class="w-full" type="email" id="email" formControlName="email" readonly />
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-4 group-validation"
          formGroupName="passwords"
        >
          <div class="form-group max-w-xs">
            <label for="currentPassword">Current Password</label>
            <input
              class="w-full"
              type="password"
              [style.paddingRight.rem]="2"
              id="currentPassword"
              formControlName="current"
              passwordToggle
            />
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
              [style.paddingRight.rem]="2"
              class="w-full"
              type="password"
              id="newPassword"
              formControlName="new"
              passwordToggle
            />
          </div>
        </div>

        <footer class="flex gap-4 mt-6">
          <button wfh type="submit" [disabled]="true" form="userForm" variant="primary">
            Update
          </button>
          <button wfh type="button" variant="neutral" [disabled]="true">Cancel</button>
        </footer>
      </form>
      <div class="mt-10 pb-10">
        <h2 class="text-xl font-bold text-gray-500">Address</h2>
        <div class="mt-6">
          <ul class="grid grid-cols-4 gap-4">
            <li
              (click)="this.addNewAddress()"
              style="min-height: 150px;"
              class="border grid place-items-center cursor-pointer text-gray-600 relative border-gray-200 hover:bg-gray-100 hover:ring-2 hover:ring-primary p-4 rounded-md"
            >
              <div class="flex gap-2 items-center">
                <rmx-icon name="add-line"></rmx-icon>
                <p>Add New</p>
              </div>
            </li>
            <ng-container *ngFor="let address of addresses$ | async">
              <li class="border text-gray-600 relative border-gray-200 p-4 rounded-md">
                <header class="absolute right-2 bottom-2 grid grid-cols-2 gap-2">
                  <button
                    wfh
                    variant="neutral"
                    size="xsmall"
                    tippy="Edit Address"
                    (click)="this.addNewAddress(true, address)"
                  >
                    <rmx-icon name="edit-2-line"></rmx-icon>
                  </button>
                  <button
                    wfh
                    variant="neutral"
                    size="xsmall"
                    class="delete"
                    tippy="Delete Address"
                    (click)="this.deleteAddress(address._id)"
                  >
                    <rmx-icon name="delete-bin-5-fill" class="icon-xs"></rmx-icon>
                  </button>
                </header>
                <p>{{ address?.apartment }}, {{ address?.street }}</p>
                <p>{{ address?.city }}</p>
                <p>{{ address?.state }}, {{ address?.country }}</p>
                <p class="font-semibold">{{ address?.zip }}</p>
                <p>{{ address?.phone }}</p>
              </li>
            </ng-container>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        @apply block mx-auto max-w-screen-2xl px-4 md:px-6;
      }

      button.delete rmx-icon {
        @apply fill-red-500;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  addresses$!: Observable<AddressResponse[]>;

  private updateAddressSubject = new Subject<void>();

  constructor(
    @Inject(USER_DETAILS) public readonly user$: Observable<UserDetails>,
    private fb: FormBuilder,
    private dialog: DialogService,
    private readonly userService: UserService,
    private readonly toast: HotToastService
  ) {
    this.addresses$ = this.updateAddressSubject
      .asObservable()
      .pipe(startWith(true))
      .pipe(switchMap(() => this.userService.getAddresses()));
  }

  ngOnInit() {
    this.initForm();
    this.user$.subscribe((user) => {
      this.userForm.patchValue(user);
    });
  }

  deleteAddress(id: string) {
    this.userService.deleteAddress(id).subscribe({
      next: () => {
        this.updateAddressSubject.next();
      },
      error: () => {
        this.toast.error('Failed to delete address');
      },
    });
  }

  addNewAddress(isEdit = false, address: AddressResponse | null = null) {
    const ref = this.dialog.open(AddressModalComponent, {
      data: {
        isEditMode: isEdit,
        address: address,
      },
    });
    ref.afterClosed$.pipe(filter((updated) => !!updated)).subscribe((updated) => {
      if (updated) {
        this.updateAddressSubject.next();
      }
    });
  }

  private initForm() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      passwords: this.fb.group({
        current: [''],
        new: [''],
      }),
    });
  }
}

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    ButtonModule,
    ReactiveFormsModule,
    IconModule,
    FormsModule,
    TippyModule,
  ],
})
export class ProfileModule {}
