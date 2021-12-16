import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookingForPage } from './looking-for.component';

const routes: Routes = [{ path: '', component: LookingForPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LookingForRoutingModule {}
