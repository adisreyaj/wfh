import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/shell/shell.component').then((m) => m.ShellModule),
      },
      {
        path: 'looking-for',
        loadChildren: () =>
          import('./pages/looking-for/looking-for.module').then((m) => m.LookingForModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
