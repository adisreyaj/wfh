import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '@wfh/ui';
import { SHELL_ROUTES } from '../../app.routes';

@Component({
  template: `
    <wfh-header></wfh-header>
    <div class="container mx-auto mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ShellComponent {}

@NgModule({
  declarations: [ShellComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: ShellComponent, children: SHELL_ROUTES }]),
    HeaderModule,
  ],
})
export class ShellModule {}
