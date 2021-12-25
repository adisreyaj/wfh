import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './wishlist.component';


const routes: Routes = [
  { path: '', component: WishlistComponent }
];

@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class WishlistModule { }
