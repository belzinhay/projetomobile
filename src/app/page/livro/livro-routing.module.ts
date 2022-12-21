import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivroPage } from './livro.page';

const routes: Routes = [
  {
    path: '',
    component: LivroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivroPageRoutingModule {}
